#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="$ROOT/deploy/acolomba-site"
PUBLISH_DIR="${PUBLISH_DIR:-$ROOT/.publish/acolomba-site}"
SITE_REPO="${SITE_REPO:-git@github.com:getantonio/acolomba-site.git}"
SITE_BRANCH="${SITE_BRANCH:-main}"
SITE_SSH_KEY="${SITE_SSH_KEY:-$HOME/.ssh/acolomba_site_github}"
COMMIT_MESSAGE="${1:-Publish site updates}"

if [[ ! -d "$SITE_DIR" ]]; then
  echo "Missing site directory: $SITE_DIR" >&2
  exit 1
fi

if [[ "$SITE_REPO" == git@github.com:* && -z "${GIT_SSH_COMMAND:-}" && -f "$SITE_SSH_KEY" ]]; then
  export GIT_SSH_COMMAND="ssh -i $SITE_SSH_KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
fi

if [[ ! -d "$PUBLISH_DIR/.git" ]]; then
  mkdir -p "$(dirname "$PUBLISH_DIR")"
  git clone --branch "$SITE_BRANCH" "$SITE_REPO" "$PUBLISH_DIR"
else
  if [[ -n "$(git -C "$PUBLISH_DIR" status --porcelain)" ]]; then
    echo "Publish checkout has uncommitted changes: $PUBLISH_DIR" >&2
    echo "Commit or remove that checkout, then run this again." >&2
    exit 1
  fi

  git -C "$PUBLISH_DIR" remote set-url origin "$SITE_REPO"
  git -C "$PUBLISH_DIR" fetch origin "$SITE_BRANCH"
  git -C "$PUBLISH_DIR" checkout "$SITE_BRANCH"
  git -C "$PUBLISH_DIR" reset --hard "origin/$SITE_BRANCH"
fi

rsync -a --delete --exclude ".git" "$SITE_DIR"/ "$PUBLISH_DIR"/

if [[ -z "$(git -C "$PUBLISH_DIR" status --porcelain)" ]]; then
  echo "No site changes to publish."
  exit 0
fi

git -C "$PUBLISH_DIR" status --short
git -C "$PUBLISH_DIR" add -A
git -C "$PUBLISH_DIR" commit -m "$COMMIT_MESSAGE"
git -C "$PUBLISH_DIR" push origin "$SITE_BRANCH"

echo "Published to $SITE_REPO on $SITE_BRANCH."
echo "Live site: http://acolomba.site/"
