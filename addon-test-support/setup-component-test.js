/**
 * Helper for streamlining setting up component tests
 */

/* eslint-disable ember-standard/destructure */
import {assign} from '@ember/polyfills'
import {setupComponentTest} from 'ember-mocha'

import './typedefs'

// Workaround to allow stubbing dependencies during testing
export const deps = {
  setupComponentTest
}

/**
 * A helper to format describe text as well as configure setupComponent from ember-mocha
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set
 * @returns {Test} a test config object
 */
function component (name, options = {}) {
  const testType = (options.unit) ? 'Unit' : 'Integration'

  return {
    label: `${testType} / Component / ${name} /`,
    setup () {
      deps.setupComponentTest(name, options)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupComponentTest with proper params
 * for a component unit test
 * @param {String} name - the name of the component
 * @param {String[]} dependencies - the list of "needs" for this component
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function unit (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  return component(name, assign(options, {unit: true}))
}

/**
 * A helper for formatting the describe text and calling setupComponentTest with proper params
 * for a component integration test
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set (alongside integration: true)
 * @returns {Test} a test config object
 */
export function integration (name, options = {}) {
  return component(name, assign(options, {integration: true}))
}
