#!/usr/bin/env node

const CLIEngine = require('eslint').CLIEngine

const Linter = require('./linter')

/**
 * List of glob directories for where to find Javascript source files
 * @type {Array.<string>}
 */
const FILE_LOCATIONS = [
  'addon/**/*.js',
  'addon-test-support/**/*.js',
  'app/**/*.js',
  'config/**/*.js',
  'test-support/**/*.js',
  'tests/**/*.js',
  '*.js'
]

/**
 * List of configuration files to look for
 * @type {Array.<string>}
 */
const CONFIG_FILE_NAMES = [
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.json'
]

const JavascriptLinter = function () {
  Linter.call(this, {
    configFileNames: CONFIG_FILE_NAMES,
    defaultConfig: '.eslintrc.js',
    fileLocations: FILE_LOCATIONS
  })
}

// Inherit from Linter class
JavascriptLinter.prototype = Object.create(Linter.prototype)
JavascriptLinter.prototype.constructor = JavascriptLinter

/**
 * Get human friendly label for severity
 * @param {Number} severity - sevrity
 * @returns {String} sevrity label
 */
function getSeverityLabel (severity) {
  switch (severity) {
    case 1:
      return 'warning'

    case 2:
      return 'error'

    default:
      return 'unknown'
  }
}

/**
 * Lint Javascript files
 * @param {String} [filePath] - single path to a file to lint (if given)
 * @params {String[]} [specificArgs] - command line arguments to use instead of process args
 * @returns {Boolean} returns true if there are linting errors
 */
JavascriptLinter.prototype.lint = function (filePath, specificArgs) {
  const config = this.getConfig()
  const args = specificArgs || process.argv

  // .eslintrc expects globals to be an object but CLIEngine expects an array
  // @see https://github.com/eslint/eslint/issues/7967
  if (typeof config.globals === 'object' && !Array.isArray(config.globals)) {
    config.globals = Object.keys(config.globals)
  }

  if (args.includes('--fix')) {
    config.fix = true
  }

  if (args.includes('--no-ignore')) {
    // This allows us to test with fixtures that would normally fail linting and are thus in the .eslintignore file
    config.ignore = false
  }

  const cli = new CLIEngine(config)

  const locations = filePath ? [filePath] : this.fileLocations
  const report = cli.executeOnFiles(locations)

  report.results.forEach((result) => {
    if (result.messages.length === 0) {
      return
    }

    this.printFilePath(result.filePath)

    result.messages.forEach((message) => {
      const msg = message.message.replace(/\.$/, '')
      const severity = getSeverityLabel(message.severity)
      this.printLintItem(message.line, message.column, severity, msg, message.ruleId)
    })

    console.log('') // logging empty line
  })

  this.printLintSummary('Javascript', report.errorCount, report.warningCount)

  if (config.fix) {
    CLIEngine.outputFixes(report)
  }

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && report.errorCount !== 0) {
    process.exit(1)
  }

  return report.errorCount !== 0
}

// If file was called via CLI
if (require.main === module) {
  let filePath
  if (process.argv.length === 3) {
    filePath = process.argv[2]
  }
  const linter = new JavascriptLinter()
  linter.lint(filePath)

// If file was required by another Node module
} else {
  module.exports = JavascriptLinter
}
