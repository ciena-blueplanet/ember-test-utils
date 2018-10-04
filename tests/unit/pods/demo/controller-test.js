/**
 * Unit test for dummy app demo route
 */
import {expect} from 'chai'
import {controller} from 'ember-test-utils/test-support/setup-test'
import {beforeEach, describe, it} from 'mocha'

const test = controller('demo')
describe(test.label, function () {
  test.setup()

  let controller
  beforeEach(function () {
    controller = this.subject({
      model: {
        username: 'tony.stark'
      }
    })
  })

  describe('name()', function () {
    it('should return the name', function () {
      expect(controller.name).to.equal('Tony Stark')
    })
  })
})
