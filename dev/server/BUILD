load("@bazel_skylib//rules:copy_file.bzl", "copy_file")
load("@rules_go//go:def.bzl", "go_binary")

go_binary(
    name = "server_bin",
    srcs = ["main.go"],
    data = [
        "server.crt",
        "server.key",
    ],
    embedsrcs = [":package"],
    tags = ["ibazel_live_reload"],
)

sh_binary(
    name = "server",
    srcs = ["run_server.sh"],
    data = [
        ":server_bin",
        "server.crt",
        "server.key",
    ],
    args = [
        "$(location :server_bin) $(location server.crt) $(location server.key)"
    ],
)

copy_file(
    name = "package",
    src = "//util:package.tar",
    out = "package.tar",
)
