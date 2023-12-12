load("@bazel_skylib//rules:copy_file.bzl", "copy_file")
load("@rules_go//go:def.bzl", "go_binary")

go_binary(
    name = "server",
    srcs = ["main.go"],
    embedsrcs = [":package"],
    tags = ["ibazel_live_reload"],
)

copy_file(
    name = "package",
    src = "//util:package.tar",
    out = "package.tar",
)
