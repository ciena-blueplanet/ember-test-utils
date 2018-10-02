/**
 * Dummy my-greeting component
 */
import Component from '@ember/component'

import {computed, readOnly} from 'ember-decorators/object'
import layout from './template'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Properties ============================================================

  layout,
  name: '',

  // == Computed Properties ===================================================

  @readOnly
  @computed('name')
  greeting (name) {
    return `Hello, ${name}`
  },

  // == Functions =============================================================

  // == Events ================================================================

  // == Actions ===============================================================

  actions: {}
})
