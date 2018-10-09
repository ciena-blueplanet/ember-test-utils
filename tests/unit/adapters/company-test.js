import {expect} from 'chai'
import {adapter} from 'ember-test-utils/test-support/setup-test'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = adapter('company')
describe(test.label, function () {
  const context = test.setup()

  describe('adapter()', function () {
    let adapter

    beforeEach(function () {
      adapter = context.subject.call(this)
    })

    afterEach(function () {
      adapter = null
    })

    it('should call customized generateIdForRecord method', function () {
      expect(adapter.generateIdForRecord()).to.include('customized')
    })
  })
})
