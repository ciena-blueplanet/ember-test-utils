/**
 * Helper for streamlining setting up mocha tests
 */

import {classify} from '@ember/string'
import {setupModelTest, setupTest} from 'ember-mocha'

import './typedefs'

// Workaround to allow stubbing dependencies during testing
export const deps = {
  setupModelTest,
  setupTest
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
      deps.setupTest(name, options)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a model unit test
 * @param {String} name - the name of the model
 * @param {String[]} dependencies - the list of "needs" for this model
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function model (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }

  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  return {
    label: `${testType} / Model / ${name} /`,
    setup () {
      deps.setupModelTest(name, options)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a serializer unit test
 * @param {String} name - the name of the serializer
 * @param {String[]} dependencies - the list of "needs" for this serializer
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function serializer (name, dependencies = [], options = {}) {
  options.needs = dependencies

  // if the serializer isn't a dependency, add it, this is b/c we're using setupModelTest() so the model is already
  // going to be loaded as the primary element under test, not the serializer, so we need to add the serializer
  if (!options.needs.includes(`serializer:${name}`)) {
    options.needs.push(`serializer:${name}`)
  }

  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  return {
    label: `${testType} / Serializer / ${name} /`,
    setup () {
      deps.setupModelTest(name, options)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a route unit test
 * @param {String} name - the name of the route
 * @param {String[]} dependencies - the list of "needs" for this route
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function route (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  return module(`route:${name}`, options)
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a controller unit test
 * @param {String} name - the name of the controller
 * @param {String[]} dependencies - the list of "needs" for this controller
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function controller (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  return module(`controller:${name}`, options)
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a service unit test
 * @param {String} name - the name of the service
 * @param {String[]} dependencies - the list of "needs" for this service
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function service (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  return module(`service:${name}`, options)
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for an adapter unit test
 * @param {String} name - the name of the adapter
 * @param {String[]} dependencies - the list of "needs" for this adapter
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function adapter (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  return module(`adapter:${name}`, options)
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a helper unit test
 * @param {String} name - the name of the helper
 * @param {String[]} dependencies - the list of "needs" for this helper
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function helper (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  // defaultSubject assumes this is a instantiable object but helpers are not
  options.subject = function (options, factory) {
    return factory.compute
  }
  return module(`helper:${name}`, options)
}
