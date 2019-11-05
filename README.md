# react-sfc-cli

[![Build status](https://api.travis-ci.org/seiwhale/react-sfc-cli.svg?branch=master)](https://travis-ci.org/seiwhale/react-sfc-cli)
[![NPM Download](https://badgen.net/npm/dm/react-sfc-cli)](https://www.npmjs.com/package/react-sfc-cli)
[![NPM Version](https://badgen.net/npm/v/react-sfc-cli)](https://www.npmjs.com/package/react-sfc-cli)
[![NPM License](https://badgen.net/npm/license/react-sfc-cli)](https://github.com/seiwhale/react-sfc-cli/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/seiwhale/react-sfc-cli/pulls)

react-sfc-cli is a powerful tool for developing react single-file component.

It makes writing docs and demo easily, integrated with an automated github workflow, and is always ready to publish to npm with best practices.

## Install

```
$ npm i react-sfc-cli -g
```

## Usage

```
npx react-sfc-cli

# After filling the prompt
cd my-component

# Use git to initialize, so you can use the commit hook
git init

# Install dependency
yarn

# Develop component
yarn dev
```
## Options

```
-u, --upgrade
```

According to the template files in the templates directory, new files will be generated and override the files with same name in current component directory. The default override files is defined in update-files.js. This option often used to upgrade the configuration of old components using the latest version of react-sfc-cli：

```
# cd my-component
npx react-sfc-cli -u
```

`—files`

If you want to update additional files, you can pass this option, multiple files use `,` to separate

```
npx react-sfc-cli -u --files package.json,.babelrc.js
```

`—test`

Generate a component template for testing, commonly used in CI .

```
npx react-sfc-cli --test
```