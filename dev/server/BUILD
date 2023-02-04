load("@io_bazel_rules_go//go:def.bzl", "go_binary")

go_binary(
    name = "server",
    srcs = ["main.go"],
    embedsrcs = [":static_tar"],
    tags = ["ibazel_live_reload"],
)

genrule(
    name = "static_tar",
    srcs = ["//:static_tar"],
    outs = ["static.tar"],
    cmd = "cp $(location //:static_tar) $@",
)
