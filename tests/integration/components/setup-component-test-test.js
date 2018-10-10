/**
 * Integration test of setup-component-test helper using the my-greeting component
 */
import {expect} from 'chai'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const test = integration('setup-component-test')
describe(test.label, function () {
  test.setup()

  describe('when rendereed', function () {
    beforeEach(function () {
      this.set('name', 'Paul')
      return this.render(hbs`{{my-greeting name=name}}`)
    })

    it('should render an <h2> tag', function () {
      expect(this.$('h2')).to.have.length(1)
    })

    it('should render the greeting within the <h2> tag', function () {
      expect(this.$('h2').text().trim()).to.equal('Hello, Paul')
    })
  })
})
