load("@aspect_rules_esbuild//esbuild:defs.bzl", "esbuild")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@bazel_skylib//rules:build_test.bzl", "build_test")

esbuild(
    name = "bundle",
    srcs =
        glob([
            "**/*.ts",
            "**/*.svelte",
        ]) + [
            "//:node_modules/esbuild-svelte",
            "//:node_modules/svelte",
            "//:node_modules/svelte-icons-pack",
            "//:node_modules/svelte-preprocess",
        ],
    config = "esbuild.config.mjs",
    entry_point = "main.ts",
    minify = True,
    visibility = ["//:__pkg__"],
)

esbuild(
    name = "new_bundle",
    srcs = glob([
        "**/*.ts",
        "**/*.tsx",
    ]),
    entry_point = "new_main.tsx",
    minify = True,
    visibility = ["//:__pkg__"],
    deps = [
        "//:node_modules/esbuild-react",
        "//:node_modules/react",
        "//:node_modules/react-dom",
        "//:node_modules/react-router",
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
