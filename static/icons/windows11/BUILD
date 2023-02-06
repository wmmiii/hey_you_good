load("@rules_pkg//pkg:mappings.bzl", "pkg_files")

pkg_files(
    name = "windows11",
    srcs = glob(
        ["*"],
        exclude = ["BUILD"],
    ),
    prefix = "/icons/windows11",
    visibility = ["//static/icons:__pkg__"],
)
