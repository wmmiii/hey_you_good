# Hey, you good?

An PWA web-app designed to promote mental health and mindfulness.

## Prerequisites

[Install Bazel][1] on your development machine.

## Development

1. Run `bazel run //dev/server`
1. Navigate to <localhost:8080>

To enable live-reload run with [Bazel watcher][2].

## Build the app

1. From within the repository run `bazel build //:static_tar`
1. The resulting `tar` file will be located under `bazel-bin/static_tar.tar` relative to the directory root

[1]: https://bazel.build/install
[2]: https://github.com/bazelbuild/bazel-watcher
