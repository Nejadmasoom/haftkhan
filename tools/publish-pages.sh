#!/usr/bin/env bash
# Refresh the playable copy on GitHub Pages: copies prototype/ from main onto the gh-pages branch and pushes it.
# Run from the repository root:  bash tools/publish-pages.sh
set -euo pipefail
tmp=$(mktemp -d)
git worktree add "$tmp" gh-pages >/dev/null
rsync -a --delete --exclude .git --exclude README.md --exclude .nojekyll prototype/ "$tmp"/
(cd "$tmp" && git add -A && { git diff --cached --quiet && echo "nothing to publish" || { git commit -qm "Update the playable copy from main"; git push origin gh-pages; }; })
git worktree remove --force "$tmp"
