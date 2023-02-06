load("@rules_pkg//pkg:mappings.bzl", "pkg_files")

pkg_files(
    name = "ios",
    srcs = glob(
        ["*"],
        exclude = ["BUILD"],
    ),
    prefix = "/icons/ios",
    visibility = ["//static/icons:__pkg__"],
)
