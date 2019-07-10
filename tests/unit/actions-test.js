/**
 * Unit test for the actions module
 */

import {expect} from 'chai'
import {callAction} from 'ember-test-utils/test-support/actions'
import {afterEach, beforeEach, describe, it} from 'mocha'

describe('Unit / utils / actions /', function () {
  let object, context, actionArgs, ret
  beforeEach(function () {
    object = {
      actions: {
        fizzBang (...args) {
          context = this
          actionArgs = args
          return 'ret-value'
        }
      }
    }

    ret = callAction(object, 'fizzBang')
  })

  afterEach(function () {
    object = null
    context = null
    actionArgs = null
    ret = null
  })

  describe('when called w/o arguments', function () {
    beforeEach(function () {
      ret = callAction(object, 'fizzBang')
    })

    it('should pass the appropriate context to the action', function () {
      expect(context).to.equal(object)
    })

    it('should return the return value of the action', function () {
      expect(ret).to.equal('ret-value')
    })
  })

  describe('when called with arguments', function () {
    beforeEach(function () {
      ret = callAction(object, 'fizzBang', 'foo', 'bar')
    })

    it('should pass the appropriate context to the action', function () {
      expect(context).to.equal(object)
    })

    it('should pass the appropriate arguments to the action', function () {
      expect(actionArgs).to.eql(['foo', 'bar'])
    })

    it('should return the return value of the action', function () {
      expect(ret).to.equal('ret-value')
    })
  })
})
