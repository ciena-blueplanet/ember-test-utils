const expect = require('chai').expect
const fs = require('fs')
const glob = require('glob-all')
const path = require('path')
const sinon = require('sinon')

const MarkdownLinter = require('../lint-markdown')

const rootProjectFiles = [
  '.bowerrc',
  '.editorconfig',
  '.ember-cli',
  '.gitignore',
  '.npmignore',
  '.travis.yml',
  '.watchmanconfig',
  'bower.json',
  'CHANGELOG.md',
  'dependency-snapshot.json',
  'ember-cli-build.js',
  'LICENSE.md',
  'package.json',
  'README.md',
  'testem.js'
]

const validFiles = [
  'valid-1.md',
  'valid-2.md'
]
  .map((fileName) => path.join(__dirname, 'fixtures', fileName))

const warnFiles = [
  'warn-1.md',
  'warn-2.md'
]
  .map((fileName) => path.join(__dirname, 'fixtures', fileName))

describe('lint-markdown', function () {
  let linter, logOutput, sandbox

  beforeEach(function () {
    linter = new MarkdownLinter()
    logOutput = []
    sandbox = sinon.createSandbox()
    sandbox.stub(console, 'log').callsFake(function (text) {
      logOutput.push(text)
    })
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should default to include top-level markdown files', function () {
    expect(linter.fileLocations).to.include('*.md')
  })

  it('should default to include doc markdown files', function () {
    expect(linter.fileLocations).to.include('docs/**/*.md')
  })

  it('should default to include addon markdown files', function () {
    expect(linter.fileLocations).to.include('addon/**/*.md')
  })

  it('should default to include app markdown files', function () {
    expect(linter.fileLocations).to.include('app/**/*.md')
  })

  it('should default to include test markdown files', function () {
    expect(linter.fileLocations).to.include('tests/**/*.md')
  })

  describe('when no config file found', function () {
    beforeEach(function () {
      const files = Array.from(rootProjectFiles)

      sandbox.stub(fs, 'readdirSync').callsFake(function (directory) {
        fs.readdirSync.restore() // Restore original method so sass-lint can use it
        return files
      })
    })

    describe('when default config file is not valid JSON', function () {
      beforeEach(function () {
        sandbox.stub(fs, 'readFileSync').returns('not-json')
      })

      it('should throw an error', function () {
        expect(function () {
          linter.lint()
        }).to.throw()
      })
    })

    describe('when default config file is valid JSON', function () {
      beforeEach(function () {
        const originalFn = fs.readFileSync

        sandbox.stub(fs, 'readFileSync').callsFake(function (filePath) {
          if (filePath.indexOf('.remarkrc') !== -1) {
            return JSON.stringify({
              plugins: {
                lint: {
                  'first-heading-level': 1
                }
              }
            })
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns([])
        })

        it('should return false', function () {
          expect(linter.lint()).to.equal(false)
        })
      })

      describe('when files to lint without errors or warnings', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(validFiles)
          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[1m\u001b[42m Markdown: 0 errors, 0 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with warnings', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(warnFiles)
          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4mcli/tests/fixtures/warn-1.md\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  First heading ' +
              'level should be `1`  \u001b[2mfirst-heading-level\u001b[22m',
            '',
            '\u001b[4mcli/tests/fixtures/warn-2.md\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  First heading ' +
              'level should be `1`  \u001b[2mfirst-heading-level\u001b[22m',
            '',
            '\u001b[1m\u001b[43m Markdown: 0 errors, 2 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })
    })
  })

  describe('when config file found', function () {
    beforeEach(function () {
      const files = Array.from(rootProjectFiles)
      files.push('.remarkrc')

      sandbox.stub(fs, 'readdirSync').callsFake(function (directory) {
        fs.readdirSync.restore() // Restore original method so sass-lint can use it
        return files
      })
    })

    describe('when config file is not valid JSON', function () {
      beforeEach(function () {
        sandbox.stub(fs, 'readFileSync').returns('not-json')
      })

      it('should throw an error', function () {
        expect(function () {
          linter.lint()
        }).to.throw()
      })
    })

    describe('when config file is valid JSON', function () {
      beforeEach(function () {
        const originalFn = fs.readFileSync

        sandbox.stub(fs, 'readFileSync').callsFake(function (filePath) {
          if (filePath.indexOf('.remarkrc') !== -1) {
            return JSON.stringify({
              plugins: {
                lint: {
                  'first-heading-level': 1
                }
              }
            })
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns([])
        })

        it('should return false', function () {
          expect(linter.lint()).to.equal(false)
        })
      })

      describe('when files to lint without errors or warnings', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(validFiles)
          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[1m\u001b[42m Markdown: 0 errors, 0 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with warnings', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(warnFiles)
          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4mcli/tests/fixtures/warn-1.md\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  First heading ' +
              'level should be `1`  \u001b[2mfirst-heading-level\u001b[22m',
            '',
            '\u001b[4mcli/tests/fixtures/warn-2.md\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  First heading ' +
              'level should be `1`  \u001b[2mfirst-heading-level\u001b[22m',
            '',
            '\u001b[1m\u001b[43m Markdown: 0 errors, 2 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })
    })
  })

  describe('.remarkignore file is respected', function () {
    let result

    beforeEach(function () {
      const files = Array.from(rootProjectFiles)
      files.push('.remarkignore')

      sandbox.stub(fs, 'readdirSync').callsFake(function (directory) {
        fs.readdirSync.restore() // Restore original method so sass-lint can use it
        return files
      })

      sandbox.stub(glob, 'sync').returns(warnFiles)

      result = linter.lint()
    })

    it('should log expected output', function () {
      expect(logOutput).to.eql([
        '\u001b[1m\u001b[42m Markdown: 0 errors, 0 warnings \u001b[49m\u001b[22m\n'
      ])
    })

    it('should return false', function () {
      expect(result).to.equal(false)
    })
  })
})
