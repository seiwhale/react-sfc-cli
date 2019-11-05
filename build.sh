#!/bin/sh
yarn stdver

yarn test

git remote add github https://$GITHUB_TOKEN@github.com/seiwhale/react-sfc-cli.git > /dev/null 2>&1
git push github HEAD:master --follow-tags

