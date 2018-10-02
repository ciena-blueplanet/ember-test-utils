const chai = require('chai')
const expect = chai.expect
const CLIEngine = require('eslint').CLIEngine
const fs = require('fs')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const JavascriptLinter = require('../lint-javascript')

chai.use(sinonChai)

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

describe('lint-javascript', function () {
  let linter, logOutput, sandbox

  beforeEach(function () {
    linter = new JavascriptLinter()
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
          if (filePath.indexOf('.eslintrc.js') !== -1) {
            const exportsStr = JSON.stringify({
              rules: {
                'complexity': ['error', 2],
                'no-console': ['warn']
              }
            })
            return `module.exports = ${exportsStr}`
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [])
          })
        })

        it('should return false', function () {
          expect(linter.lint()).to.equal(false)
        })
      })

      describe('when files to lint without errors or warnings', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/valid-*.js'
            ])
          })

          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[1m\u001b[42m Javascript: 0 errors, 0 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with warnings', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/warn-*.js'
            ])
          })

          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4mtests/cli/fixtures/warn-1.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  Unexpected console ' +
              'statement  \u001b[2mno-console\u001b[22m',
            '',
            '\u001b[4mtests/cli/fixtures/warn-2.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  Unexpected console ' +
              'statement  \u001b[2mno-console\u001b[22m',
            '',
            '\u001b[1m\u001b[43m Javascript: 0 errors, 2 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with errors', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/error-*.js'
            ])
          })
          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4mtests/cli/fixtures/error-1.js\u001b[24m',
            '  \u001b[2m1:18\u001b[22m  \u001b[31merror\u001b[39m  Function ' +
              'has a complexity of 3  \u001b[2mcomplexity\u001b[22m',
            '',
            '\u001b[4mtests/cli/fixtures/error-2.js\u001b[24m',
            '  \u001b[2m1:18\u001b[22m  \u001b[31merror\u001b[39m  Function ' +
              'has a complexity of 4  \u001b[2mcomplexity\u001b[22m',
            '',
            '\u001b[1m\u001b[37m\u001b[41m Javascript: 2 errors, 0 warnings \u001b[49m\u001b[39m\u001b[22m\n'
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
      files.push('.eslintrc.js')

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
          if (filePath.indexOf('.eslintrc.js') !== -1) {
            const exportsStr = JSON.stringify({
              rules: {
                'complexity': ['error', 2],
                'no-console': ['warn']
              }
            })
            return `module.exports = ${exportsStr}`
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [])
          })
        })

        it('should return false', function () {
          expect(linter.lint()).to.equal(false)
        })
      })

      describe('when files to lint without errors or warnings', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/valid-*.js'
            ])
          })

          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[1m\u001b[42m Javascript: 0 errors, 0 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with warnings', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/warn-*.js'
            ])
          })

          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4mtests/cli/fixtures/warn-1.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  Unexpected console ' +
              'statement  \u001b[2mno-console\u001b[22m',
            '',
            '\u001b[4mtests/cli/fixtures/warn-2.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  Unexpected console ' +
              'statement  \u001b[2mno-console\u001b[22m',
            '',
            '\u001b[1m\u001b[43m Javascript: 0 errors, 2 warnings \u001b[49m\u001b[22m\n'
          ])
        })

        it('should return false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with errors', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/error-*.js'
            ])
          })
          result = linter.lint()
        })

        it('should log expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4mtests/cli/fixtures/error-1.js\u001b[24m',
            '  \u001b[2m1:18\u001b[22m  \u001b[31merror\u001b[39m  Function ' +
              'has a complexity of 3  \u001b[2mcomplexity\u001b[22m',
            '',
            '\u001b[4mtests/cli/fixtures/error-2.js\u001b[24m',
            '  \u001b[2m1:18\u001b[22m  \u001b[31merror\u001b[39m  Function ' +
              'has a complexity of 4  \u001b[2mcomplexity\u001b[22m',
            '',
            '\u001b[1m\u001b[37m\u001b[41m Javascript: 2 errors, 0 warnings \u001b[49m\u001b[39m\u001b[22m\n'
          ])
        })

        it('should return true', function () {
          expect(result).to.equal(true)
        })
      })
    })

    describe('when config file is valid JSON and contains globals object', function () {
      beforeEach(function () {
        const originalFn = fs.readFileSync

        sandbox.stub(fs, 'readFileSync').callsFake(function (filePath) {
          if (filePath.indexOf('.eslintrc.js') !== -1) {
            const exportsStr = JSON.stringify({
              globals: {
                andThen: false
              },
              rules: {
                'complexity': ['error', 2],
                'no-console': ['warn']
              }
            })
            return `module.exports = ${exportsStr}`
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
            return originalFn.call(this, [])
          })
        })

        it('should not throw error', function () {
          expect(function () {
            linter.lint()
          }).not.to.throw()
        })
      })
    })
  })

  describe('when linting a whole project', function () {
    let fileLocations
    beforeEach(function () {
      const originalFn = CLIEngine.prototype.executeOnFiles

      sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
        return originalFn.call(this, [])
      })

      linter.lint()
      fileLocations = CLIEngine.prototype.executeOnFiles.lastCall.args[0]
    })

    it('should lint files in addon directory', function () {
      expect(fileLocations).to.include('addon/**/*.js')
    })

    it('should lint files in addon-test-support/ directory', function () {
      expect(fileLocations).to.include('addon-test-support/**/*.js')
    })

    it('should lint files in app/ directory', function () {
      expect(fileLocations).to.include('app/**/*.js')
    })

    it('should lint files in config/ directory', function () {
      expect(fileLocations).to.include('config/**/*.js')
    })

    it('should lint files in mirage/ directory', function () {
      expect(fileLocations).to.include('mirage/**/*.js')
    })

    it('should lint files in test-support/ directory', function () {
      expect(fileLocations).to.include('test-support/**/*.js')
    })

    it('should lint files in tests/ directory', function () {
      expect(fileLocations).to.include('tests/**/*.js')
    })

    it('should lint files at the root of the repo', function () {
      expect(fileLocations).to.include('*.js')
    })
  })

  describe('when linting a single file', function () {
    let fileLocations
    beforeEach(function () {
      const originalFn = CLIEngine.prototype.executeOnFiles

      sandbox.stub(CLIEngine.prototype, 'executeOnFiles').callsFake(function () {
        return originalFn.call(this, [])
      })

      linter.lint('foo/bar/baz.js')
      fileLocations = CLIEngine.prototype.executeOnFiles.lastCall.args[0]
    })

    it('should only lint that one file', function () {
      expect(fileLocations).to.eql(['foo/bar/baz.js'])
    })
  })

  describe('when checking file with fixable errors without "--fix"', function () {
    let result
    beforeEach(function () {
      const originalFn = fs.readFileSync

      sandbox.stub(fs, 'readFileSync').callsFake(function (filePath) {
        if (filePath.indexOf('.eslintrc.js') !== -1) {
          const exportsStr = JSON.stringify({
            parser: 'babel-eslint',
            rules: {
              'no-var': ['error']
            }
          })
          return `module.exports = ${exportsStr}`
        }

        return originalFn(...arguments)
      })
      sandbox.stub(CLIEngine, 'outputFixes')
      result = linter.lint('tests/cli/fixtures/fixable-error-1.js', ['--no-ignore'])
    })

    it('should not call CLIEngine.outputFixes', function () {
      expect(CLIEngine.outputFixes).to.have.callCount(0)
    })

    it('should report error', function () {
      expect(logOutput[3]).to.match(/Javascript: 1 errors, 0 warnings/)
    })

    it('should return true', function () {
      expect(result).to.equal(true)
    })

    describe('when specifying "--fix" argument', function () {
      beforeEach(function () {
        logOutput = []
        result = linter.lint('tests/cli/fixtures/fixable-error-1.js', ['--fix', '--no-ignore'])
      })

      it('should call CLIEngine.outputFixes', function () {
        expect(CLIEngine.outputFixes).to.have.callCount(1)
      })

      it('should not report fixable errors', function () {
        expect(logOutput[0]).to.match(/Javascript: 0 errors, 0 warnings/)
      })

      it('should return false', function () {
        expect(result).to.equal(false)
      })
    })
  })
})
