/**
 * Integration test of the mock-component helper on a the dependency-inject-component
 */
import {render} from '@ember/test-helpers'
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
    beforeEach(async function () {
      registerMockComponent(this)

      await render(hbs`
        {{dependency-inject-component
          injectComponent=(component 'mock-component')
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this)
    })

    it('should render the injectComponent with default name', function () {
      expect(this.element.querySelector('dummy')).to.not.equal(null)
    })
  })

  describe('when mock-component is used with a provided name', function () {
    beforeEach(async function () {
      registerMockComponent(this, 'mock-inject')

      await render(hbs`
        {{dependency-inject-component
          injectComponent=(component 'mock-inject')
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-inject')
    })

    it('should render the injectComponent with provided name', function () {
      expect(this.element.querySelector('dummy')).to.not.equal(null)
    })
  })

  describe('when mock-component is used with an options: {}', function () {
    beforeEach(async function () {
      registerMockComponent(this, 'mock-inject', {
        classNames: 'mock-inject'
      })

      await this.render(hbs`
        {{dependency-inject-component
          injectComponent=(component 'mock-inject')
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-inject')
    })

    it('should render the injectComponent with provided name', function () {
      expect(this.element.querySelector('.mock-inject')).to.not.equal(null)
    })
  })

  describe('when mock-component is used with layout in the options', function () {
    beforeEach(async function () {
      registerMockComponent(this, 'mock-inject', {
        classNames: 'mock-inject',
        title: 'My Title',
        layout: hbs`
          <h1>{{title}}</h1>
        `
      })

      await render(hbs`
        {{dependency-inject-component
          injectComponent=(component 'mock-inject')
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-inject')
    })

    it('should render the injectComponent with provided layout', function () {
      expect(this.element.querySelector('.mock-inject h1').textContent).to.equal('My Title')
    })
  })
})
