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
)

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

	out, err := os.Create(outFile)
	if err != nil {
		log.Fatal(err)
	}
	tarWriter := tar.NewWriter(out)

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
			data = bytes.ReplaceAll(data, []byte("%BUILD_CHECKSUM%"), []byte(checksumString))
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
		Name: "file_manifest.json",
		Size: int64(len(manifestBytes)),
	})
	tarWriter.Write(manifestString)

	// Close tar
	tarWriter.Close()
}

type manifest struct {
	Files    []string
	Checksum string
}
