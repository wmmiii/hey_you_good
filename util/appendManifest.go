package main

import (
	"archive/tar"
	"bytes"
	"crypto/md5"
	_ "embed"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"time"
)

var gitHubOutput = os.Getenv("GITHUB_OUTPUT")

const checksumReplace = "%BUILD_CHECKSUM%"

func main() {
	var tarFile string
	var outFile string

	// Read input flags
	flag.StringVar(&tarFile, "tar", "", "The `.tar` file to append a manifest to.")
	flag.StringVar(&outFile, "out", "manifest.json", "The output tar with the appended manifest.")

	flag.Parse()

	if tarFile == "" {
		log.Fatal("--tar must be specified!")
	}

	// Read embedded tar file into temporary directory
	tarBytes, err := os.ReadFile(tarFile)
	if err != nil {
		log.Fatal(err)
	}
	tarReader := tar.NewReader(bytes.NewReader(tarBytes))

	h := md5.New()
	h.Write(tarBytes)
	checksum := h.Sum(nil)
	checksumString := fmt.Sprintf("%x", checksum)

	// Write out to GitHub actions if applicable
	if gitHubOutput != "" {
		f, err := os.OpenFile(gitHubOutput, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
		if err != nil {
			log.Fatal(err)
		}

		defer f.Close()

		if _, err = f.WriteString("build_checksum=" + checksumString); err != nil {
			log.Fatal(err)
		}
	}

	// Proxy calls to
	out, err := os.Create(outFile)
	if err != nil {
		log.Fatal(err)
	}
	tarWriter := tar.NewWriter(out)
	defer tarWriter.Close()

	files := []string{}

	for {
		cur, err := tarReader.Next()
		if err == io.EOF {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		tarWriter.WriteHeader(cur)
		if cur.Typeflag == tar.TypeReg {
			files = append(files, cur.Name)
			data, err := io.ReadAll(tarReader)
			if err != nil {
				log.Fatal(err)
			}
			data = bytes.ReplaceAll(data, []byte(checksumReplace), []byte(checksumString))
			tarWriter.Write(data)
		}
	}

	// Create manifest file
	manifest := manifest{
		Files:    files,
		Checksum: checksumString,
	}

	manifestString, err := json.Marshal(manifest)
	if err != nil {
		log.Fatal(err)
	}

	manifestBytes := []byte(manifestString)

	// Append manifest file
	tarWriter.WriteHeader(&tar.Header{
		Name:       "file_manifest.json",
		Size:       int64(len(manifestBytes)),
		ModTime:    time.Unix(0, 0),
		AccessTime: time.Unix(0, 0),
		ChangeTime: time.Unix(0, 0),
	})
	tarWriter.Write(manifestString)
}

type manifest struct {
	Files    []string
	Checksum string
}
