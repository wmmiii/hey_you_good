load("@rules_pkg//pkg:mappings.bzl", "pkg_files")

pkg_files(
    name = "android",
    srcs = glob(
        ["*"],
        exclude = ["BUILD"],
    ),
    prefix = "/icons/android",
    visibility = ["//static/icons:__pkg__"],
)
