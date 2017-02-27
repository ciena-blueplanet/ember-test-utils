import {expect} from 'chai'
import {initialize} from 'ember-hook'
import {forTestingOnly} from 'ember-test-utils/test-support/wait-for-render'
import {beforeEach, describe, it} from 'mocha'

describe('Unit / Async Helper / wait-for-render', function () {
  beforeEach(function () {
    initialize()
  })

  describe('Parameters', function () {
    it('should not throw error when passed a string', function () {
      expect(forTestingOnly.validateInput('string')).to.eql(undefined)
    })

    it('should throw error when not passed as string', function () {
      return forTestingOnly.validateInput(null).catch(function (message) {
        expect(message).to.eql(forTestingOnly.validationErrorMessage)
      })
    })
  })

  describe('Waits for render', function () {
    it('should resolve when found', function () {
      forTestingOnly.$hook = function () {
        return [1]
      }

      return forTestingOnly.helper(null, 'hookName').then(function (response) {
        expect(response).to.eql(true)
      })
    })

    // We would like to have a test case for when the helper promise does not resolve
    // but there is currently not a good way to do so
  })
})
