/**
 * Unit test for the person model
 */
import {expect} from 'chai'
import {model} from 'ember-test-utils/test-support/setup-test'
import {afterEach, describe, it} from 'mocha'

const test = model('person', ['model:company'])
describe(test.label, function () {
  const context = test.setup()

  describe('fullName()', function () {
    let person, company

    afterEach(function () {
      person = null
      company = null
    })

    it('should combine first and last name', function () {
      person = context.subject.call(this, {
        firstName: 'John',
        lastName: 'Doe'
      })
      expect(person.get('fullName')).to.equal('John Doe')
    })

    it('should combine all the address pieces', function () {
      person = context.subject.call(this, {
        firstName: 'John',
        lastName: 'Doe'
      })

      company = context.subject.call(this, {
        street: '123 Main Street',
        city: 'Smallville',
        state: 'KA',
        zip: '12345'
      }, 'company')

      person.set('company', company)
      expect(person.get('company.address')).to.equal('123 Main Street\nSmallville, KA 12345')
    })
  })
})
