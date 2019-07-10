/**
 * Unit test for dummy app demo route
 */
import {expect} from 'chai'
import {route} from 'ember-test-utils/test-support/setup-test'
import {returnPromiseFromStub, stubService} from 'ember-test-utils/test-support/stub'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = route('demo', ['model:company'])
describe(test.label, function () {
  const context = test.setup()

  let route, sandbox, store, resolver, model
  beforeEach(function () {
    sandbox = sinon.createSandbox()
    store = stubService(this, sandbox, 'store')
    route = context.subject.call(this)
  })

  afterEach(function () {
    sandbox.restore()
    sandbox = null
    route = null
    store = null
    resolver = null
    model = null
  })

  describe('.model()', function () {
    beforeEach(function () {
      resolver = returnPromiseFromStub(store.findAll)
      route.model().then((value) => {
        model = value
      })
    })

    it('should find all the companies', function () {
      expect(store.findAll).to.have.been.calledWith('company')
    })

    describe('when findAll resolves', function () {
      beforeEach(async function () {
        resolver.resolve(['one', 'two', 'three'])
        await resolver.promise
      })

      it('should return the proper username', function () {
        expect(model.username).to.equal('tony.stark')
      })

      it('should return the proper companies', function () {
        expect(model.companies).to.eql(['one', 'two', 'three'])
      })
    })
  })
})
