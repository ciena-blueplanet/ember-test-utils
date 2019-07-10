/**
 * Integration test of setup-component-test helper using the my-greeting component
 */
import {render} from '@ember/test-helpers'
import {expect} from 'chai'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const test = integration('setup-component-test')
describe(test.label, function () {
  test.setup()

  describe('when rendered', function () {
    beforeEach(async function () {
      this.set('name', 'Paul')
      await render(hbs`{{my-greeting name=name}}`)
    })

    it('should render an <h2> tag', function () {
      expect(this.element.querySelector('h2')).not.to.equal(null)
    })

    it('should render the greeting within the <h2> tag', function () {
      expect(this.element.querySelector('h2').textContent).to.equal('Hello, Paul')
    })
  })

  describe('when providing component properties with subject', function () {
    beforeEach(async function () {
      this.set('name', 'Paul')
      this.set('salutation', 'Greetings')
      await render(hbs`{{my-greeting name=name salutation=salutation}}`)
    })

    it('should render the greeting within the <h2> tag', function () {
      expect(this.element.querySelector('h2').textContent).to.equal('Greetings, Paul')
    })
  })
})
