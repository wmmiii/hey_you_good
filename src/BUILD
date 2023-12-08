load("@aspect_rules_esbuild//esbuild:defs.bzl", "esbuild")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@bazel_skylib//rules:build_test.bzl", "build_test")

esbuild(
    name = "bundle",
    srcs = glob([
        "**/*.scss",
        "**/*.ts",
        "**/*.tsx",
    ]),
    config = "esbuild.config.mjs",
    entry_point = "main.tsx",
    minify = False,
    visibility = ["//:__pkg__"],
    deps = [
        "//:node_modules/esbuild-scss-modules-plugin",
        "//:node_modules/react",
        "//:node_modules/react-dom",
        "//:node_modules/react-router",
        "//:node_modules/react-router-dom",
    ],
)

# ts_project(
#     name = "typecheck",
#     srcs = glob(
#         [
#             "**/*.ts",
#             "**/*.tsx",
#         ],
#     ),
#     allow_js = True,
#     declaration = True,
#     declaration_map = True,
#     preserve_jsx = True,
#     source_map = True,
#     transpiler = "tsc",
#     tsconfig = "//:tsconfig",
#     deps = [
#         "//:node_modules/esbuild-react",
#         "//:node_modules/react",
#         "//:node_modules/react-dom",
#         "//:node_modules/react-router",
#     ],
# )

# build_test(
#     name = "typecheck_test",
#     targets = [
#         ":typecheck",
#     ],
# )

esbuild(
    name = "service_worker",
    srcs =
        glob(["**/*.ts"]),
    entry_point = "serviceWorker/serviceWorker.ts",
    visibility = ["//:__pkg__"],
)
