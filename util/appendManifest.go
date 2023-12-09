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
	var checksumFile string

	// Read input flags
	flag.StringVar(&tarFile, "tar", "", "The `.tar` file to append a manifest to.")
	flag.StringVar(&outFile, "out", "package.tar", "The output tar with the appended manifest.")
	flag.StringVar(&checksumFile, "checksumFile", "checksum.txt", "The output file that will contain the checksum of the package.")

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

	// Write out the checksum file
	checkOut, err := os.Create(checksumFile)
	if err != nil {
		log.Fatal(err)
	}
	defer checkOut.Close()
	checkOut.WriteString(checksumString)

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
		if cur.Typeflag != tar.TypeReg {
			tarWriter.WriteHeader(cur)
		} else if cur.Typeflag == tar.TypeReg {
			files = append(files, cur.Name)
			data, err := io.ReadAll(tarReader)
			if err != nil {
				log.Fatal(err)
			}
			data = bytes.ReplaceAll(data, []byte(checksumReplace), []byte(checksumString))
			cur.Size = int64(len(data))
			tarWriter.WriteHeader(cur)
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
		Mode:       0x0777,
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
