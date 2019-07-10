/**
 * Unit test for dummy app demo route
 */
import {expect} from 'chai'
import {controller} from 'ember-test-utils/test-support/setup-test'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = controller('demo')
describe(test.label, function () {
  const context = test.setup()

  let controller
  beforeEach(function () {
    controller = context.subject.call(this, {
      model: {
        username: 'tony.stark'
      }
    })
  })

  afterEach(function () {
    controller = null
  })

  describe('name()', function () {
    it('should return the name', function () {
      expect(controller.get('name')).to.equal('Tony Stark')
    })
  })
})
