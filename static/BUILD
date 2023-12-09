load("@bazel_skylib//rules:copy_file.bzl", "copy_file")
load("@rules_pkg//pkg:mappings.bzl", "pkg_filegroup", "pkg_files")

pkg_filegroup(
    name = "static",
    srcs = [
        ":root",
        "//static/fonts",
        "//static/icons",
    ],
    visibility = ["//:__pkg__"],
)

pkg_files(
    name = "root",
    srcs = glob(
        ["*"],
        exclude = ["BUILD"],
    ) + [":404"],
)

copy_file(
    name = "404",
    src = "index.html",
    out = "404.html",
)
