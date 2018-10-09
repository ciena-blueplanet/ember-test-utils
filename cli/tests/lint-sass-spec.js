const expect = require('chai').expect
const fs = require('fs')
const glob = require('glob-all')
const path = require('path')
const sinon = require('sinon')

const SassLinter = require('../lint-sass')

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

const errorFiles = [
  'error-1.scss',
  'error-2.scss'
]
  .map((fileName) => path.join(__dirname, 'fixtures', fileName))

const validFiles = [
  'valid-1.scss',
  'valid-2.scss'
]
  .map((fileName) => path.join(__dirname, 'fixtures', fileName))

const warnFiles = [
  'warn-1.scss',
  'warn-2.scss'
]
  .map((fileName) => path.join(__dirname, 'fixtures', fileName))

describe('lint-sass', function () {
  let linter, logOutput, sandbox

  beforeEach(function () {
    linter = new SassLinter()
    logOutput = []
    sandbox = sinon.createSandbox()
    sandbox.stub(console, 'log').callsFake(function (text) {
      logOutput.push(text)
    })
  })

  afterEach(function () {
    sandbox.restore()
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
          if (filePath.indexOf('.sass-lint.yml') !== -1) {
            return JSON.stringify({
              files: {
                include: '+(addon|app|tests)/styles/**/*.s+(a|c)ss'
              },
              options: {
                formatter: 'stylish',
                'merge-default-rules': false
              },
              rules: {
                'no-important': 1,
                'property-sort-order': [
                  2,
                  {
                    order: 'smacss'
                  }
                ]
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
            '\u001b[1m\u001b[42m SASS: 0 errors, 0 warnings \u001b[49m\u001b[22m\n'
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
            '\u001b[4mcli/tests/fixtures/warn-1.scss\u001b[24m',
            '  \u001b[2m2:16\u001b[22m  \u001b[33mwarning\u001b[39m  !important not allowed' +
              '  \u001b[2mno-important\u001b[22m',
            '',
            '\u001b[4mcli/tests/fixtures/warn-2.scss\u001b[24m',
            '  \u001b[2m2:15\u001b[22m  \u001b[33mwarning\u001b[39m  !important not allowed' +
              '  \u001b[2mno-important\u001b[22m',
            '',
            '\u001b[1m\u001b[43m SASS: 0 errors, 2 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with errors', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(errorFiles)
          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4mcli/tests/fixtures/error-1.scss\u001b[24m',
            '  \u001b[2m2:3\u001b[22m  \u001b[31merror\u001b[39m  Expected `width`, found' +
              ' `height`  \u001b[2mproperty-sort-order\u001b[22m',
            '  \u001b[2m3:3\u001b[22m  \u001b[31merror\u001b[39m  Expected `height`, found' +
              ' `width`  \u001b[2mproperty-sort-order\u001b[22m',
            '',
            '\u001b[4mcli/tests/fixtures/error-2.scss\u001b[24m',
            '  \u001b[2m2:3\u001b[22m  \u001b[31merror\u001b[39m  Expected `display`,' +
              ' found `flex-basis`  \u001b[2mproperty-sort-order\u001b[22m',
            '  \u001b[2m3:3\u001b[22m  \u001b[31merror\u001b[39m  Expected `flex-basis`,' +
              ' found `display`  \u001b[2mproperty-sort-order\u001b[22m',
            '',
            '\u001b[1m\u001b[37m\u001b[41m SASS: 4 errors, 0 warnings \u001b[49m\u001b[39m\u001b[22m\n'
          ])
        })

        it('should return true', function () {
          expect(result).to.equal(true)
        })
      })
    })
  })

  describe('when config file found', function () {
    beforeEach(function () {
      const files = Array.from(rootProjectFiles)
      files.push('.sass-lint.yml')

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
          if (filePath.indexOf('.sass-lint.yml') !== -1) {
            return JSON.stringify({
              files: {
                include: '+(addon|app|tests)/styles/**/*.s+(a|c)ss'
              },
              options: {
                formatter: 'stylish',
                'merge-default-rules': false
              },
              rules: {
                'no-important': 1,
                'property-sort-order': [
                  2,
                  {
                    order: 'smacss'
                  }
                ]
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
            '\u001b[1m\u001b[42m SASS: 0 errors, 0 warnings \u001b[49m\u001b[22m\n'
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
            '\u001b[4mcli/tests/fixtures/warn-1.scss\u001b[24m',
            '  \u001b[2m2:16\u001b[22m  \u001b[33mwarning\u001b[39m  !important not allowed' +
              '  \u001b[2mno-important\u001b[22m',
            '',
            '\u001b[4mcli/tests/fixtures/warn-2.scss\u001b[24m',
            '  \u001b[2m2:15\u001b[22m  \u001b[33mwarning\u001b[39m  !important not allowed' +
              '  \u001b[2mno-important\u001b[22m',
            '',
            '\u001b[1m\u001b[43m SASS: 0 errors, 2 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with errors', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(errorFiles)
          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4mcli/tests/fixtures/error-1.scss\u001b[24m',
            '  \u001b[2m2:3\u001b[22m  \u001b[31merror\u001b[39m  Expected `width`, found' +
              ' `height`  \u001b[2mproperty-sort-order\u001b[22m',
            '  \u001b[2m3:3\u001b[22m  \u001b[31merror\u001b[39m  Expected `height`, found' +
              ' `width`  \u001b[2mproperty-sort-order\u001b[22m',
            '',
            '\u001b[4mcli/tests/fixtures/error-2.scss\u001b[24m',
            '  \u001b[2m2:3\u001b[22m  \u001b[31merror\u001b[39m  Expected `display`,' +
              ' found `flex-basis`  \u001b[2mproperty-sort-order\u001b[22m',
            '  \u001b[2m3:3\u001b[22m  \u001b[31merror\u001b[39m  Expected `flex-basis`,' +
              ' found `display`  \u001b[2mproperty-sort-order\u001b[22m',
            '',
            '\u001b[1m\u001b[37m\u001b[41m SASS: 4 errors, 0 warnings \u001b[49m\u001b[39m\u001b[22m\n'
          ])
        })

        it('should return true', function () {
          expect(result).to.equal(true)
        })
      })
    })
  })
})
