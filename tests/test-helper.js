/* globals mocha */
import Application from '../app'
import config from '../config/environment'
import {setApplication} from '@ember/test-helpers'
import {start} from 'ember-mocha'

mocha.setup({
  noHighlighting: true
})

setApplication(Application.create(config.APP))

start()
