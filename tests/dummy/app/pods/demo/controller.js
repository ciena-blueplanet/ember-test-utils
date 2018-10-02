/**
 * Controller for dummy app
 */
import Controller from '@ember/controller'

import {capitalize} from '@ember/string'
import {computed, readOnly} from 'ember-decorators/object'

export default Controller.extend({
  @readOnly
  @computed('model.username')
  name (username) {
    return username.split('.').map((part) => capitalize(part)).join(' ')
  }
})
