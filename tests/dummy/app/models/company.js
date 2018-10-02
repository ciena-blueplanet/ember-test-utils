/**
 * dummy company model
 */
import DS from 'ember-data'
import {computed, readOnly} from 'ember-decorators/object'
const {Model, attr} = DS

export default Model.extend({
  name: attr('string'),
  street: attr('string'),
  city: attr('string'),
  state: attr('string'),
  zip: attr('string'),

  @readOnly
  @computed('street', 'city', 'state', 'zip')
  address (street, city, state, zip) {
    return street + '\n' + `${city}, ${state} ${zip}`
  }
})
