load("@aspect_rules_ts//ts:defs.bzl", "ts_config")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@rules_pkg//pkg:pkg.bzl", "pkg_tar")

npm_link_all_packages(name = "node_modules")

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    visibility = [":__subpackages__"],
)

pkg_tar(
    name = "static_tar",
    srcs = [
        "//src:bundle",
        "//src:service_worker",
        "//static",
    ],
    visibility = ["//util:__pkg__"],
)
