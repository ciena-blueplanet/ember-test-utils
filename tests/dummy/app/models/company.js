/**
 * dummy company model
 */
import DS from 'ember-data'
import computed from 'ember-macro-helpers/computed'
const {Model, attr} = DS

export default Model.extend({
  name: attr('string'),
  street: attr('string'),
  city: attr('string'),
  state: attr('string'),
  zip: attr('string'),

  address: computed('street', 'city', 'state', 'zip', function (street, city, state, zip) {
    return street + '\n' + `${city}, ${state} ${zip}`
  }).readOnly()
})
