import Router from '@ember/routing/router'

import config from './config/environment'

const MyRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

MyRouter.map(function () {
  this.route('demo', {path: '/'})
})

export default MyRouter
