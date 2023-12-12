load("@rules_go//go:def.bzl", "go_binary")

go_binary(
    name = "append_manifest",
    srcs = ["appendManifest.go"],
)

genrule(
    name = "package",
    srcs = ["//:static_tar"],
    outs = [
        "package.tar",
        "checksum.txt",
    ],
    cmd = """
$(location :append_manifest) \\
    --tar $(location //:static_tar) \\
    --out $(location package.tar) \\
    --checksumFile $(location checksum.txt)
""",
    tools = [":append_manifest"],
    visibility = ["//dev/server:__pkg__"],
)
