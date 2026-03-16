#!/bin/sh
exec "$(dirname "$0")/node_modules/@esbuild/darwin-arm64/bin/esbuild" "$@"
