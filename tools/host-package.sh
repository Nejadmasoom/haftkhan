#!/usr/bin/env bash
# Build the package for an ordinary web host: only what the game needs on a website.
#   bash tools/host-package.sh OUT.zip
# Left out on purpose: pose/model.js and pose/wasm.js (20 MB of text copies used only when the game is opened by
# double-clicking a file; on a website the original binaries are fetched instead), and leftovers such as digits.png.
# Added: .htaccess (correct types for the two binary files, gzip, caching, and a move to https — the camera only
# works on https).
set -euo pipefail
out=${1:-haftkhan-host.zip}; root=$(cd "$(dirname "$0")/.." && pwd); tmp=$(mktemp -d)
mkdir -p "$tmp/site"
cp -a "$root/prototype/." "$tmp/site/"
rm -f "$tmp/site/pose/model.js" "$tmp/site/pose/wasm.js" "$tmp/site/digits.png"
cp "$root/tools/host.htaccess" "$tmp/site/.htaccess"
(cd "$tmp/site" && rm -f "$OLDPWD/$out" 2>/dev/null; zip -qr -9 "$tmp/pkg.zip" . )
mv "$tmp/pkg.zip" "$out"; rm -rf "$tmp"; ls -la "$out"
