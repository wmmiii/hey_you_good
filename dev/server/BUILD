load("@io_bazel_rules_go//go:def.bzl", "go_binary")

go_binary(
    name = "server",
    srcs = ["main.go"],
    embedsrcs = [":package"],
    tags = ["ibazel_live_reload"],
)

genrule(
    name = "package",
    srcs = ["//util:package.tar"],
    outs = ["package.tar"],
    cmd = "cp $(location //util:package.tar) $@",
)
