load("@rules_pkg//pkg:mappings.bzl", "pkg_filegroup", "pkg_files")

pkg_filegroup(
    name = "icons",
    srcs = [
        ":original",
        "//static/icons/android",
        "//static/icons/favicons",
        "//static/icons/ios",
        "//static/icons/windows11",
    ],
    visibility = ["//static:__pkg__"],
)

pkg_files(
    name = "original",
    srcs = glob(
        ["*"],
        exclude = ["BUILD"],
    ),
    prefix = "/icons",
)
