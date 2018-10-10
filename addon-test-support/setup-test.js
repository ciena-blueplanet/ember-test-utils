/**
 * Helper for streamlining setting up mocha tests
 */

import {classify} from '@ember/string'
import {setupTest} from 'ember-mocha'

import './typedefs'

// Workaround to allow stubbing dependencies during testing
export const deps = {
  setupTest
}

/**
 * Create test subject for Module type
 * @param {String} name - the name of the Module
 * @returns {Test} test context object with a subject method
 */
export function createTestContextForModule (name) {
  return {
    subject (options = {}, nameOverrides) {
      if (!this.owner) {
        console.error('Make sure you have run setup() before trying to access subject.')
      }

      const subject = this.owner.lookup(nameOverrides || name)

      Object.keys(options).forEach(key => {
        subject.set(key, options[key])
      })

      return subject
    }
  }
}

/**
 * Create test subject for Model type
 * @param {String} name - the name of the Model
 * @returns {Test} test context object with a subject method
 */
export function createTestContextForModel (name) {
  return {
    subject (options = {}, nameOverrides) {
      if (!this.owner) {
        console.error('Make sure you have run setup() before trying to access subject.')
      }

      const subject = this.owner.lookup('service:store').createRecord(nameOverrides || name, options)

      return subject
    }
  }
}

/**
 * Create test subject for Serializer type
 * @param {String} name - the name of the Serializer
 * @returns {Test} test context object with a subject method
 */
export function createTestContextForSerializer (name) {
  return {
    subject (options = {}, nameOverrides) {
      if (!this.owner) {
        console.error('Make sure you have run setup() before trying to access subject.')
      }

      this.owner.lookup('service:store').createRecord(nameOverrides || name, options)

      return this.owner.lookup(`serializer:${name}`)
    }
  }
}

/**
 * Create test subject for Adapter type
 * @param {String} name - the name of the Serializer
 * @returns {Test} test context object with a subject method
 */
export function createTestContextForAdapter (name) {
  return {
    subject (options = {}, nameOverrides) {
      if (!this.owner) {
        console.error('Make sure you have run setup() before trying to access subject.')
      }

      this.owner.lookup('service:store').createRecord(nameOverrides || name, options)

      return this.owner.lookup(`adapter:${name}`)
    }
  }
}

/**
 * A helper to format describe text as well as configure setupTest from ember-mocha
 * @param {String} name - the name of the module (including type, i.e. 'controller:foo')
 * @param {Object} options - any additional options to set
 * @returns {Test} a test config object
 */
export function module (name, options = {}) {
  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  const [moduleType, moduleName] = name.split(':')
  return {
    label: `${testType} / ${classify(moduleType)} / ${moduleName} /`,
    setup () {
      deps.setupTest()
      return createTestContextForModule(name)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a model unit test
 * @param {String} name - the name of the model
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function model (name, options = {}) {
  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  return {
    label: `${testType} / Model / ${name} /`,
    setup () {
      deps.setupTest()
      return createTestContextForModel(name)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a serializer unit test
 * @param {String} name - the name of the serializer
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function serializer (name, options = {}) {
  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  return {
    label: `${testType} / Serializer / ${name} /`,
    setup () {
      deps.setupTest()
      return createTestContextForSerializer(name)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for an adapter unit test
 * @param {String} name - the name of the adapter
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function adapter (name, options = {}) {
  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  return {
    label: `${testType} / Adapter / ${name} /`,
    setup () {
      deps.setupTest()
      return createTestContextForAdapter(name)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a route unit test
 * @param {String} name - the name of the route
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function route (name, options = {}) {
  return module(`route:${name}`, options)
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a controller unit test
 * @param {String} name - the name of the controller
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function controller (name, options = {}) {
  return module(`controller:${name}`, options)
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a service unit test
 * @param {String} name - the name of the service
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function service (name, options = {}) {
  return module(`service:${name}`, options)
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a helper unit test
 * @param {String} name - the name of the helper
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function helper (name, options = {}) {
  // defaultSubject assumes this is a instantiable object but helpers are not
  options.subject = function (options, factory) {
    return factory.compute
  }
  return module(`helper:${name}`, options)
}
