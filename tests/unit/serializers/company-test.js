import {expect} from 'chai'
import {serializer} from 'ember-test-utils/test-support/setup-test'
import {describe, it} from 'mocha'

const test = serializer('company')
describe(test.label, function () {
  const context = test.setup()

  describe('address()', function () {
    it('should combine all the address pieces', function () {
      const serializer = context.subject.call(this, {
        street: '123 Main Street',
        city: 'Smallville',
        state: 'KA',
        zip: '12345'
      })

      expect(serializer.normalizeSingleResponse({}, {}, {}, '1', 'GET')).to.eql({extraKey: 'extraKey'})
    })
  })
})
