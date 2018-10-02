/**
 * Dummy person model
 */
import DS from 'ember-data'
import {computed, readOnly} from 'ember-decorators/object'
const {Model, attr, belongsTo} = DS

export default Model.extend({
  company: belongsTo('company'),
  firstName: attr('string'),
  lastName: attr('string'),

  @readOnly
  @computed('firstName', 'lastName')
  fullName (firstName, lastName) {
    return `${firstName} ${lastName}`
  }
})
