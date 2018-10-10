/**
 * Helper for streamlining setting up component tests
 */

/* eslint-disable ember-standard/destructure */
import {assign} from '@ember/polyfills'
import {setupRenderingTest, setupTest} from 'ember-mocha'

import './typedefs'

// Workaround to allow stubbing dependencies during testing
export const deps = {
  setupRenderingTest,
  setupTest
}

/**
 * A helper to format describe text as well as configure setupComponent from ember-mocha
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set
 * @returns {Test} a test config object
 */
function component (name, options = {}) {
  const testType = (options.unit) ? 'Unit' : 'Integration'

  if (testType === 'Unit') {
    return {
      label: `${testType} / Component / ${name} /`,
      setup () {
        deps.setupTest()

        return {
          subject (overrides) {
            if (!this.owner) {
              console.error('Make sure you have run setup() before trying to access subject.')
            }

            const subject = this.owner.lookup(`component:${name}`)
            Object.keys(overrides).forEach(key => {
              subject.set(key, overrides[key])
            })

            return subject
          }
        }
      }
    }
  }

  return {
    label: `${testType} / Component / ${name} /`,
    setup () {
      deps.setupRenderingTest()
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupRenderingTest with proper params
 * for a component unit test
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function unit (name, options = {}) {
  return component(name, assign(options, {unit: true}))
}

/**
 * A helper for formatting the describe text and calling setupRenderingTest with proper params
 * for a component integration test
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set (alongside integration: true)
 * @returns {Test} a test config object
 */
export function integration (name, options = {}) {
  return component(name, assign(options, {integration: true}))
}
