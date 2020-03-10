#!/usr/bin/env node

const chalk = require('chalk')

const dockerLinter = require('./lint-docker')
const templateLinter = require('./lint-htmlbars')
const javascriptLinter = require('./lint-javascript')
const markdownLinter = require('./lint-markdown')
const sassLinter = require('./lint-sass')

/**
 * Lint project files (Docker, HTMLBars, Javascript, Markdown, and SASS)
 * @returns {Boolean} returns true if there are linting errors
 */
function lint () {
  console.log(
    chalk.gray('Running linting…\n')
  )

  // Run all linters
  const results = [
    dockerLinter,
    templateLinter,
    javascriptLinter,
    markdownLinter,
    sassLinter
  ]
    .map((Linter) => {
      const linter = new Linter()
      return linter.lint()
    })

  console.log(
    chalk.gray('\nlinting complete!')
  )

  const erred = results.indexOf(true) !== -1

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && erred) {
    process.exit(1)
  }

  return erred
}

// If file was called via CLI
if (require.main === module) {
  lint()

// If file was required by another Node module
} else {
  module.exports = lint
}
