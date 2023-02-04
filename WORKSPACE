workspace(name = "hey_you_good")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

###############################################################################
# R U L E S   P K G
###############################################################################

http_archive(
    name = "rules_pkg",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_pkg/releases/download/0.8.0/rules_pkg-0.8.0.tar.gz",
        "https://github.com/bazelbuild/rules_pkg/releases/download/0.8.0/rules_pkg-0.8.0.tar.gz",
    ],
    sha256 = "eea0f59c28a9241156a47d7a8e32db9122f3d50b505fae0f33de6ce4d9b61834",
)
load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")
rules_pkg_dependencies()

###############################################################################
# R U L E S   J S
###############################################################################

http_archive(
    name = "aspect_rules_js",
    sha256 = "9f51475dd2f99abb015939b1cf57ab5f15ef36ca6d2a67104450893fd0aa5c8b",
    strip_prefix = "rules_js-1.16.0",
    url = "https://github.com/aspect-build/rules_js/archive/refs/tags/v1.16.0.tar.gz",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = DEFAULT_NODE_VERSION,
)

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    pnpm_lock = "//:pnpm-lock.yaml",
    generate_bzl_library_targets = True,
    verify_node_modules_ignored = "//:.bazelignore",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()


###############################################################################
# R U L E S   T S
###############################################################################

http_archive(
    name = "aspect_rules_ts",
    sha256 = "acb20a4e41295d07441fa940c8da9fd02f8637391fd74a14300586a3ee244d59",
    strip_prefix = "rules_ts-1.2.0",
    url = "https://github.com/aspect-build/rules_ts/archive/refs/tags/v1.2.0.tar.gz",
)

##################
# rules_ts setup #
##################

load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(
    # This keeps the TypeScript version in-sync with the editor, which is typically best.
    ts_version_from = "//:package.json",
)

# Register aspect_bazel_lib toolchains;
# If you use npm_translate_lock or npm_import from aspect_rules_js you can omit this block.
load("@aspect_bazel_lib//lib:repositories.bzl", "register_copy_directory_toolchains", "register_copy_to_directory_toolchains")

register_copy_directory_toolchains()

register_copy_to_directory_toolchains()


###############################################################################
# R U L E S   E S B U I L D
###############################################################################

http_archive(
    name = "aspect_rules_esbuild",
    sha256 = "f05e9a53ae4b394ca45742ac35f7e658a8ba32cba14b5d531b79466ae86dc7f0",
    strip_prefix = "rules_esbuild-0.14.0",
    url = "https://github.com/aspect-build/rules_esbuild/archive/refs/tags/v0.14.0.tar.gz",
)


######################
# rules_esbuild setup #
######################

load("@aspect_rules_esbuild//esbuild:dependencies.bzl", "rules_esbuild_dependencies")

rules_esbuild_dependencies()

# Register a toolchain containing esbuild npm package and native bindings
load("@aspect_rules_esbuild//esbuild:repositories.bzl", LATEST_ESBUILD_VERSION = "LATEST_VERSION", "esbuild_register_toolchains")

esbuild_register_toolchains(
    name = "esbuild",
    esbuild_version = LATEST_ESBUILD_VERSION,
)

###############################################################################
# R U L E S   G O
###############################################################################

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "dd926a88a564a9246713a9c00b35315f54cbd46b31a26d5d8fb264c07045f05d",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.38.1/rules_go-v0.38.1.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.38.1/rules_go-v0.38.1.zip",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains(version = "1.19.5")
