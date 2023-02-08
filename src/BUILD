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
            "//:node_modules/svelte-preprocess",
        ],
    config = "esbuild.config.mjs",
    entry_point = "main.ts",
    minify = True,
    visibility = ["//:__pkg__"],
)
