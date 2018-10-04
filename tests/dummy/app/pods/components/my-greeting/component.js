/**
 * Dummy my-greeting component
 */
import Component from '@ember/component'

import computed from 'ember-macro-helpers/computed'
import layout from './template'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Properties ============================================================

  layout,
  name: '',

  // == Computed Properties ===================================================

  greeting: computed('name', function (name) {
    return `Hello, ${name}`
  }).readOnly(),

  // == Functions =============================================================

  // == Events ================================================================

  // == Actions ===============================================================

  actions: {}
})
