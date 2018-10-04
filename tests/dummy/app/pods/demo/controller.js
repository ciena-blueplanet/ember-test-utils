/**
 * Controller for dummy app
 */
import Controller from '@ember/controller'

import {capitalize} from '@ember/string'
import computed from 'ember-macro-helpers/computed'

export default Controller.extend({
  name: computed('model.username', function (username) {
    return username.split('.').map((part) => capitalize(part)).join(' ')
  }).readOnly()
})
