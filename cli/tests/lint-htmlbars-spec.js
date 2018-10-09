const chai = require('chai')
const expect = chai.expect
const TemplateLinter = require('ember-template-lint')
const fs = require('fs')
const glob = require('glob-all')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const HtmlbarsLinter = require('../lint-htmlbars')

const stubError = {
  rule: 'the-rule',
  message: 'the-message',
  moduleId: 'the-module-id',
  line: 13,
  column: 31,
  source: 'the-source'
}

describe('lint-htmlbars', function () {
  let linter, logOutput, sandbox
  beforeEach(function () {
    linter = new HtmlbarsLinter()
    logOutput = []
    sandbox = sinon.createSandbox()
    sandbox.stub(linter, 'getConfig').returns({the: 'config'})
    sandbox.stub(linter, 'printLintSummary')
    sandbox.stub(console, 'log').callsFake(function (text) {
      logOutput.push(text)
    })

    sandbox.stub(glob, 'sync').returnsArg(0)
    sandbox.stub(fs, 'readFileSync').returnsArg(0)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when no file path is given and no errors are found', function () {
    let ret
    beforeEach(function () {
      sandbox.stub(TemplateLinter.prototype, 'verify').returns([])
      ret = linter.lint()
    })

    it('should return false', function () {
      expect(ret).to.equal(false)
    })

    // TODO: add more tests (@ameadows 2017-06-02)
  })

  describe('when a single file path is given and errors are found', function () {
    let ret
    beforeEach(function () {
      sandbox.stub(TemplateLinter.prototype, 'verify').returns([stubError])
      ret = linter.lint('foo-bar.hbs')
    })

    it('should only verify the one file', function () {
      expect(TemplateLinter.prototype.verify).to.have.callCount(1)
    })

    it('should pass the single given path to verify()', function () {
      expect(TemplateLinter.prototype.verify).to.have.been.calledWith({
        moduleId: 'foo-bar.hbs',
        source: 'foo-bar.hbs'
      })
    })

    it('should return true', function () {
      expect(ret).to.equal(true)
    })

    // TODO: add more tests (@ameadows 2017-06-02)
  })
})
