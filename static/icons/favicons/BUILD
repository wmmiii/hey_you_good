load("@rules_pkg//pkg:mappings.bzl", "pkg_files")

pkg_files(
    name = "favicons",
    srcs = glob(
        ["*"],
        exclude = ["BUILD"],
    ),
    visibility = ["//static/icons:__pkg__"],
)
