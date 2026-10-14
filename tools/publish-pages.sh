#!/usr/bin/env bash
# Refresh the playable copy on GitHub Pages: copies prototype/ from main onto the gh-pages branch and pushes it.
# Run from the repository root:  bash tools/publish-pages.sh
set -euo pipefail
tmp=$(mktemp -d)
git worktree add "$tmp" gh-pages >/dev/null
# copy without rsync (not every machine has it): clear everything but the branch's own files, then copy
find "$tmp" -mindepth 1 -maxdepth 1 ! -name .git ! -name README.md ! -name .nojekyll -exec rm -rf {} +
cp -a prototype/. "$tmp"/
(cd "$tmp" && git add -A && { git diff --cached --quiet && echo "nothing to publish" || { git commit -qm "Update the playable copy from main"; git push origin gh-pages; }; })
git worktree remove --force "$tmp"
