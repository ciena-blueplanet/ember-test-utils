/**
 * Dummy person model
 */
import DS from 'ember-data'
import computed from 'ember-macro-helpers/computed'
const {Model, attr, belongsTo} = DS

export default Model.extend({
  company: belongsTo('company'),
  firstName: attr('string'),
  lastName: attr('string'),

  fullName: computed('firstName', 'lastName', function (firstName, lastName) {
    return `${firstName} ${lastName}`
  }).readOnly()
})
