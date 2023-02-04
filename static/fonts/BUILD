load("@rules_pkg//pkg:mappings.bzl", "pkg_files")

pkg_files(
    name = "fonts",
    srcs = glob(
        ["*"],
        exclude = ["BUILD"],
    ),
    prefix = "/fonts",
    visibility = ["//static:__pkg__"],
)
