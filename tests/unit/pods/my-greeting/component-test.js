/**
 * Unit test of the my-greeting component
 */
import {expect} from 'chai'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = unit('my-greeting')
describe(test.label, function () {
  const context = test.setup()
  let component

  beforeEach(function () {
    component = context.subject.call(this, {
      name: 'John'
    })
  })

  afterEach(function () {
    component = null
  })

  describe('greeting()', function () {
    it('should utilize the name properly', function () {
      expect(component.get('greeting')).to.equal('Hello, John')
    })
  })
})
