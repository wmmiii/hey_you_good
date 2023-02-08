load("@aspect_rules_esbuild//esbuild:defs.bzl", "esbuild")

esbuild(
    name = "bundle",
    srcs =
        glob([
            "**/*.ts",
            "**/*.svelte",
        ]) + [
            "//:node_modules/svelte",
            "//:node_modules/esbuild-svelte",
            "//:node_modules/svelte-icons-pack",
            "//:node_modules/svelte-preprocess",
        ],
    config = "esbuild.config.mjs",
    entry_point = "main.ts",
    minify = True,
    visibility = ["//:__pkg__"],
)

esbuild(
    name = "service_worker",
    srcs =
        glob(["**/*.ts"]),
    entry_point = "serviceWorker.ts",
    visibility = ["//:__pkg__"],
)
