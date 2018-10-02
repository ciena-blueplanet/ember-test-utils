/**
 * Unit test for the stub helpers
 */

import {get} from '@ember/object'

import Service from '@ember/service'

import {expect} from 'chai'
import wait from 'ember-test-helpers/wait'
import {
  returnPromiseFromStub,
  storeMethods,
  stubService
} from 'ember-test-utils/test-support/stub'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('Unit / utils / stub /', function () {
  let sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('stubService()', function () {
    let context, sbox, result
    beforeEach(function () {
      context = {
        container: {
          lookup: sandbox.stub().returns('the-service')
        },
        register: sandbox.stub()
      }
      sbox = {
        stub: sandbox.stub().returns('a-stub')
      }
    })

    describe('when stubbing store', function () {
      beforeEach(function () {
        result = stubService(context, sbox, 'store')
      })

      it('should register the store', function () {
        expect(context.register).to.have.been.calledWith('service:store', sinon.match.any)
      })

      it('should lookup the service after stubbing it', function () {
        expect(context.container.lookup).to.have.been.calledWith('service:store')
      })

      it('should return the result of the lookup', function () {
        expect(result).to.equal('the-service')
      })

      describe('the stubbed service', function () {
        let service
        beforeEach(function () {
          service = context.register.lastCall.args[1]
        })

        it('should extend Service', function () {
          expect(Service.detect(service)).to.equal(true)
        })

        storeMethods.forEach((method) => {
          it(`should stub the "${method}" method`, function () {
            const proto = service.proto()
            expect(get(proto, method)).to.equal('a-stub')
          })
        })
      })
    })

    describe('when stubbing something else', function () {
      beforeEach(function () {
        result = stubService(context, sbox, 'fizz-bang', ['foo', 'bar'])
      })

      it('should register the store', function () {
        expect(context.register).to.have.been.calledWith('service:fizz-bang', sinon.match.any)
      })

      it('should lookup the service after stubbing it', function () {
        expect(context.container.lookup).to.have.been.calledWith('service:fizz-bang')
      })

      it('should return the result of the lookup', function () {
        expect(result).to.equal('the-service')
      })

      describe('the stubbed service', function () {
        let service
        beforeEach(function () {
          service = context.register.lastCall.args[1]
        })

        it('should extend Service', function () {
          expect(Service.detect(service)).to.equal(true)
        })

        ;['foo', 'bar'].forEach((method) => {
          it(`should stub the "${method}" method`, function () {
            const proto = service.proto()
            expect(get(proto, method)).to.equal('a-stub')
          })
        })
      })
    })
  })

  describe('returnPromiseFromStub()', function () {
    let stub, resolver
    beforeEach(function () {
      stub = {
        returns: sandbox.stub(),
        withArgs: sandbox.stub().returnsThis()
      }
    })

    describe('when no arguments are passed in', function () {
      beforeEach(function () {
        resolver = returnPromiseFromStub(stub)
      })

      it('should call .withArgs() with no arguments', function () {
        expect(stub.withArgs).to.have.been.calledWith()
      })

      it('should call .returns() with the promise', function () {
        expect(stub.returns).to.have.been.calledWith(resolver.promise)
      })

      describe('when resolving', function () {
        let result, error
        beforeEach(function () {
          result = error = null
          resolver.promise
            .then((resp) => {
              result = resp
            })
            .catch((err) => {
              error = err
            })

          resolver.resolve('all good')
          return wait()
        })

        describe('the returned promise', function () {
          it('should not reject', function () {
            expect(error).to.equal(null)
          })

          it('should resolve with what we resolved with', function () {
            expect(result).to.equal('all good')
          })
        })
      })

      describe('when rejecting', function () {
        let result, error
        beforeEach(function () {
          result = error = null
          resolver.promise
            .then((resp) => {
              result = resp
            })
            .catch((err) => {
              error = err
            })

          resolver.reject('aw, snap')
          return wait()
        })

        describe('the returned promise', function () {
          it('should not resolve', function () {
            expect(result).to.equal(null)
          })

          it('should reject with what we rejected with', function () {
            expect(error).to.equal('aw, snap')
          })
        })
      })
    })

    describe('when arguments are passed in', function () {
      beforeEach(function () {
        resolver = returnPromiseFromStub(stub, ['fizz', 'bang'])
      })

      it('should call .withArgs() with correct arguments', function () {
        expect(stub.withArgs).to.have.been.calledWith('fizz', 'bang')
      })

      it('should call .returns() with the promise', function () {
        expect(stub.returns).to.have.been.calledWith(resolver.promise)
      })

      describe('when resolving', function () {
        let result, error
        beforeEach(function () {
          result = error = null
          resolver.promise
            .then((resp) => {
              result = resp
            })
            .catch((err) => {
              error = err
            })

          resolver.resolve('all good')
          return wait()
        })

        describe('the returned promise', function () {
          it('should not reject', function () {
            expect(error).to.equal(null)
          })

          it('should resolve with what we resolved with', function () {
            expect(result).to.equal('all good')
          })
        })
      })

      describe('when rejecting', function () {
        let result, error
        beforeEach(function () {
          result = error = null
          resolver.promise
            .then((resp) => {
              result = resp
            })
            .catch((err) => {
              error = err
            })

          resolver.reject('aw, snap')
          return wait()
        })

        describe('the returned promise', function () {
          it('should not resolve', function () {
            expect(result).to.equal(null)
          })

          it('should reject with what we rejected with', function () {
            expect(error).to.equal('aw, snap')
          })
        })
      })
    })
  })
})
