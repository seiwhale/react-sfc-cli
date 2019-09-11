#! /user/bin/env node

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const readline = require('readline-sync')
const { logger, kebabcasify } = require('./utils/index')
const FileActions = require('./utils/handle-file');
const parseArgs = require('./utils/parse-args');

const promptAngle = chalk.dim('> ');
const OWNER_NAME = 'react-sfc';
const argv = parseArgs(process.argv.slice(2));
let { npmName, ownerName } = checkRequiredArgs();

/**
 * get required args
 * @returns {Object} ${arg}_name = argv.get(arg)
 */
function checkRequiredArgs() {
  const required_args = ['npm', 'owner'];
  let args_obj = {};
  required_args.forEach(item => {
    args_obj[`${item}Name`] = argv.get(item);
  })
  return args_obj
}

/**
 * Is upgrade
 */
function isUpgrade() {
  return argv.has('u') || argv.has('upgrade')
}

/* _______________________________________ */
let pkg = {};
let pkgName = '';

if (isUpgrade()) {
  try {
    pkg = require(path.join(process.cwd(), 'package.json'))
    pkgName = pkg.name.replace(/^@[\w-]*\//, '')
  } catch {}
}

if (argv.has('test')) {
  npmName = 'v-test'
  ownerName = ownerName
}

if (!npmName) {
  console.log(
    `The component name: ${pkgName ? chalk.dim(`(${pkgName})`) : ''}`
  )
  npmName = readline.prompt({
    defaultInput: pkgName,
    prompt: promptAngle
  })
}

if (!ownerName) {
  console.log(
    `The owner: ${chalk.dim(`(${OWNER_NAME})`)}`
  )
  ownerName = readline.prompt({
    prompt: promptAngle,
    defaultInput: OWNER_NAME
  })
}

const componentName = kebabcasify(npmName)
const outDir = path.join(process.cwd(), componentName)

const fileActions = new FileActions({
  argv,
  pkg,
  componentName,
  ownerName,
  outDir,
  templatesDir: path.join(__dirname, 'templates')
})

if (!isUpgrade()) {
  fileActions.create()

  fileActions.move({
    patterns: {
      gitignore: '.gitignore',
      'package-json': 'package.json',
      'src/component.js': `src/${componentName}.js`
    }
  })

  // fs.chmodSync(path.join(outDir, 'build.sh'), '755')
  // fs.chmodSync(path.join(outDir, 'notify.sh'), '755')

  logger.success(`Generated into ${chalk.underline(outDir)}`)
}

if (isUpgrade()) {
  fileActions.upgrade()
}