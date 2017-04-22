import Ember from 'ember'
const {RSVP: {Promise}, Test, run: {later, next}, typeOf} = Ember
import {$hook} from 'ember-hook'

const validationErrorMessage = 'waitForRender Test Helper expects a hook name provided as a string'

/**
 * Validate selector is a string
 *
 * @param {*} [selector] Selector passed to helper
 * @returns {ember/RSVP/Promise|undefined} a rejected promise with error message
 */
const validateInput = function (selector) {
  if (typeOf(selector) !== 'string') {
    return Promise.reject(validationErrorMessage)
  }
}

/**
 * Waits for an element to be found in the DOM before resolving
 *
 * @param {Object} app Application instance
 * @param {String} selector ember-hook hook name
 * @returns {Boolean|undefined} Resolves `true` when element found in DOM
 */
const helper = function (app, selector) {
  forTestingOnly.validateInput(selector)

  return new Promise((resolve) => {
    next(() => {
      const checkDOM = function () {
        if (forTestingOnly.$hook(selector).length > 0) {
          resolve(true)
        } else {
          later(checkDOM, 25)
        }
      }

      checkDOM()
    })
  })
}

export default Test.registerAsyncHelper('waitForRender', helper)

/**
 * These functions do not need to be exported for use by consumer code as they have no external use.
 * They are exported though so that they can be tested.
 * They are namespaced as such to indicate this deliniation and dissuade their use by consumer code
 *
 * @type {Object}
 */
const forTestingOnly = {
  $hook,
  helper,
  validateInput,
  validationErrorMessage
}

export {forTestingOnly}
