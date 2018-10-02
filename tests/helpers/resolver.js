import config from '../../config/environment'
import Resolver from '../../resolver'

const resolver = Resolver.create({
  namespace: 'ember-test-utils'
})

resolver.namespace = {
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix
}

export default resolver
