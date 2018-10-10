/**
 * Integration test of the mock-component helper on a the dependency-inject-component
 */
import {expect} from 'chai'
import {
  registerMockComponent,
  unregisterMockComponent
} from 'ember-test-utils/test-support/mock-component'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = integration('mock-component')
describe(test.label, function () {
  test.setup()

  describe('when mock-component is used to set the injected component', function () {
    beforeEach(function () {
      registerMockComponent(this)

      return this.render(hbs`
        {{dependency-inject-component
          injectComponent=(component 'mock-component')
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this)
    })

    it('should render the injectComponent with default name', function () {
      expect(this.$('dummy')).to.have.length(1)
    })
  })

  describe('when mock-component is used with a provided name', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-inject')

      return this.render(hbs`
        {{dependency-inject-component
          injectComponent=(component 'mock-inject')
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-inject')
    })

    it('should render the injectComponent with provided name', function () {
      expect(this.$('dummy')).to.have.length(1)
    })
  })

  describe('when mock-component is used with an options: {}', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-inject', {
        classNames: 'mock-inject'
      })

      return this.render(hbs`
        {{dependency-inject-component
          injectComponent=(component 'mock-inject')
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-inject')
    })

    it('should render the injectComponent with provided name', function () {
      expect(this.$('.mock-inject')).to.have.length(1)
    })
  })

  describe('when mock-component is used with layout in the options', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-inject', {
        classNames: 'mock-inject',
        title: 'My Title',
        layout: hbs`
          <h1>{{title}}</h1>
        `
      })

      return this.render(hbs`
        {{dependency-inject-component
          injectComponent=(component 'mock-inject')
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-inject')
    })

    it('should render the injectComponent with provided layout', function () {
      expect(this.$('.mock-inject').text().trim()).to.equal('My Title')
    })
  })
})
