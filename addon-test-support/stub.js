/**
 * Module to provide helpers for stubbing things, specifically services
 */

import Service from '@ember/service'

import RSVP from 'rsvp'

/**
 * @typedef Resolver
 * A resolver for a particular Promise, used to resolve or reject said Promise
 * @property {Function} resolve - the method to call to resolve the Promise
 * @property {Function} reject - the method to call to reject the Promise
 */

/**
 * The methods in DS.Store we want to stub
 * Taken from http://emberjs.com/api/data/classes/DS.Store.html
 */
export const storeMethods = [
  'adapterFor',
  'buildRecord',
  'createRecord',
  'dataWasUpdated',
  'deleteRecord',
  'didSaveRecord',
  'didUpdateAll',
  'fetchRecord',
  'find',
  'findAll',
  'findBelongsTo',
  'findByIds',
  'findHasMany',
  'findMany',
  'findRecord',
  'flushPendingSave',
  'getReference',
  'hashRecordForId',
  'init',
  'modelFor',
  'normalize',
  'peekAll',
  'peekRecord',
  'push',
  'pushPayload',
  'query',
  'queryRecord',
  'recordForId',
  'recordIsLoaded',
  'recordWasError',
  'recordWasInvalid',
  'reloadRecord',
  'retrieveManagedInstance',
  'scheduleSave',
  'serialize',
  'serializeFor',
  'typeMapFor',
  'unloadAll',
  'unloadRecord',
  'updateId'
]

/**
 * Stub a service
 * @param {Object} context - the test context ('this' from within beforeEach)
 * @param {Object} sandbox - the sinon sandbox to use for generating stubs
 * @param {String} name - the name of the service to stub
 * @param {String[]} methodsToStub - the name of methods to stub on the service
 * @returns {Service} the service with stubs for all methods provided
 */
export function stubService (context, sandbox, name, methodsToStub) {
  if (name === 'store' && !methodsToStub) {
    methodsToStub = storeMethods
  }

  const stubs = {}
  methodsToStub.forEach((method) => {
    stubs[method] = sandbox.stub()
  })

  const service = Service.extend(stubs)
  context.register(`service:${name}`, service)
  return context.container.lookup(`service:${name}`)
}

/**
 * Stub out a particular method with specific arguments to return a promise
 * @param {Stub} stub - the stubbed method
 * @param {Object[]} [args] - the arguments to limit the stub to
 * @returns {Resolver} the resolver for the promise that will be returned
 */
export function returnPromiseFromStub (stub, args) {
  const resolver = {}
  const promise = new RSVP.Promise((resolve, reject) => {
    resolver.resolve = resolve
    resolver.reject = reject
  })

  resolver.promise = promise

  if (args) {
    stub.withArgs(...args).returns(promise)
  } else {
    stub.withArgs().returns(promise)
  }

  return resolver
}
