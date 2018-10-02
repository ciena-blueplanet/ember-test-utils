import {getOwner} from '@ember/application'
import Component from '@ember/component'
import {merge} from '@ember/polyfills'

/**
 * Create and register a mock component
 * @param {Object} context - the test context ('this' from within beforeEach)
 * @param {String} name - the name of the component
 * @param {Object} opts - the optional properties (classNames, etc...)
 * @returns {undefined}
 */
export function registerMockComponent (context, name = 'mock-component', opts = {}) {
  const owner = getOwner(context)
  const options = merge({tagName: 'dummy'}, opts)
  const mockComponent = Component.extend(options)

  unregisterMockComponent(context)
  owner.register(`component:${name}`, mockComponent)
}

/**
 * Unregister a mock component
 * @param {Object} context - the test context ('this' from within beforeEach)
 * @param {String} name - the name of the component
 * @returns {undefined}
 */
export function unregisterMockComponent (context, name = 'mock-component') {
  const owner = getOwner(context)

  if (owner.resolveRegistration(`component:${name}`)) {
    owner.unregister(`component:${name}`)
  }
}
