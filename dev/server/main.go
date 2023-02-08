package main

import (
	"archive/tar"
	"bytes"
	_ "embed"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
)

var (
	//go:embed package.tar
	package_tar []byte

	reloadScript = os.Getenv("IBAZEL_LIVERELOAD_URL")
)

func main() {
	var port int

	// Read input flags
	flag.IntVar(&port, "port", 8080, "Specify which port to bind the server to.")
	flag.Parse()

	// Create temporary directory
	temp, err := ioutil.TempDir("/tmp", "temp-")
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		os.RemoveAll(temp)
		log.Printf("Destroyed temp dir %s", temp)
	}()

	log.Printf("Created temp dir %s", temp)

	// Read embedded tar file into temporary directory
	tarReader := tar.NewReader(bytes.NewReader(package_tar))

	for {
		cur, err := tarReader.Next()
		if err == io.EOF {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		filePath := path.Join(temp, cur.Name)
		if cur.Typeflag == tar.TypeDir {
			if err = os.MkdirAll(filePath, cur.FileInfo().Mode()); err != nil {
				log.Fatal(err)
			}
			continue
		} else if cur.Typeflag != tar.TypeReg {
			continue
		}
		data, err := io.ReadAll(tarReader)
		if err != nil {
			log.Fatal(err)
		}
		if err := os.WriteFile(filePath, data, 0o0666); err != nil {
			log.Fatal(err)
		}
	}

	// Serve files
	rootHandler, err := newRootHandler(temp)
	if err != nil {
		log.Fatal(err)
	}
	http.Handle("/", rootHandler)

	log.Printf("Listening on :%d...", port)
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}

type rootHandler struct {
	index string
	fs    http.Handler
}

func (h *rootHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		w.Write([]byte(h.index))
	} else {
		h.fs.ServeHTTP(w, r)
	}
}

func newRootHandler(temp string) (http.Handler, error) {
	indexBytes, err := os.ReadFile(path.Join(temp, "index.html"))
	if err != nil {
		return nil, err
	}
	index := string(indexBytes[:])

	if reloadScript != "" {
		index = strings.ReplaceAll(
			index,
			"<!-- Inject scripts here -->",
			fmt.Sprintf("<script src=\"%s\"></script>", reloadScript))
	}

	fs := http.FileServer(http.Dir(temp))
	return &rootHandler{
		index: index,
		fs:    fs,
	}, nil
}
