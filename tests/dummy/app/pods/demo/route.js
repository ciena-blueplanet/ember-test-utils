import Route from '@ember/routing/route'
import {inject as service} from '@ember/service'
import RSVP from 'rsvp'

export default Route.extend({
  store: service(),

  model () {
    return RSVP.hash({
      companies: this.get('store').findAll('company'),
      username: 'tony.stark'
    })
  }
})
