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
  salutation: '',
  defaultSalutation: 'Hello',

  // == Computed Properties ===================================================

  greeting: computed('salutation', 'name', function (salutation, name) {
    return `${salutation}, ${name}`
  }).readOnly(),

  // == Functions =============================================================

  init () {
    this._super(...arguments)
    // setting a default to exercise logic in init for testing purposes
    if (!this.salutation) {
      this.set('salutation', this.defaultSalutation)
    }
  },

  // == Events ================================================================

  // == Actions ===============================================================

  actions: {}
})
