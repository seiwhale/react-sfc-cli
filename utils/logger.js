/**
 * Modified from @egoist/sao
 */

const chalk = require('chalk')
const path = require('path')

class Logger {
  log(...args) {
    console.log(...args)
  }

  success(...args) {
    this.log(chalk.green('success'), ...args)
  }

  error(...args) {
    this.log(chalk.red('error'), ...args)
  }

  warn(...args) {
    this.log(chalk.yellow('warning'), ...args)
  }

  done(...args) {
    this.log(chalk.green(process.platform === 'win32' ? '√' : '✔'), ...args)
  }

  tip(...args) {
    this.log(chalk.blue('tip'), ...args)
  }

  info(...args) {
    this.log(chalk.cyan('info'), ...args)
  }

  fileAction(color, type, fp) {
    this.info(
      chalk[color](type), chalk.green(path.relative(process.cwd(), fp))
    )
  }

  fileMoveAction(from, to) {
    this.info(
      chalk.blue('Moved'),
      chalk.green(path.relative(process.cwd(), from)),
      chalk.dim('->'),
      chalk.green(path.relative(process.cwd(), to))
    )
  }
}

module.exports = new Logger()