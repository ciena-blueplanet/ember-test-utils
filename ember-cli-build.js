/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: ['es7.decorators']
    },
    'ember-cli-mocha': {
      useLintTree: false
    },
    sassOptions: {
      includePaths: [
        'node_modules/ember-frost-css-core/scss',
        'node_modules/ember-frost-theme/scss'
      ]
    }
  })

  if (app.env === 'test' || app.env === 'development') {
    ;[
      'bower_components/sinon-chai/lib/sinon-chai.js',
      'bower_components/chai-jquery/chai-jquery.js'
    ].forEach((path) => {
      app.import(path, {type: 'test'})
    })
  }

  return app.toTree()
}
