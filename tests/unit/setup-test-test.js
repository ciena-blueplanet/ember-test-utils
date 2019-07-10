/**
 * Unit tests for the setup-test module
 */

import {expect} from 'chai'
import {
  adapter,
  controller,
  deps,
  helper,
  model,
  module,
  route,
  serializer,
  service
} from 'ember-test-utils/test-support/setup-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('setupTest()', function () {
  let sandbox, test
  beforeEach(function () {
    sandbox = sinon.createSandbox()
    sandbox.stub(deps, 'setupTest')
  })

  afterEach(function () {
    sandbox.restore()
    sandbox = null
    test = null
  })

  describe('module()', function () {
    describe('when just name is given', function () {
      beforeEach(function () {
        test = module('foo:my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Foo / my-bar /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith()
        })
      })
    })
  })

  describe('model()', function () {
    describe('when just name is given', function () {
      beforeEach(function () {
        test = model('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Model / my-bar /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith()
        })
      })
    })
  })

  describe('serializer()', function () {
    describe('when just name is given', function () {
      beforeEach(function () {
        test = serializer('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Serializer / my-bar /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith()
        })
      })
    })
  })

  describe('route()', function () {
    describe('when just name is given', function () {
      beforeEach(function () {
        test = route('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Route / my-bar /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith()
        })
      })
    })
  })

  describe('controller()', function () {
    describe('when just name is given', function () {
      beforeEach(function () {
        test = controller('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Controller / my-bar /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith()
        })
      })
    })
  })

  describe('service()', function () {
    describe('when just name is given', function () {
      beforeEach(function () {
        test = service('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Service / my-bar /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith()
        })
      })
    })
  })

  describe('adapter()', function () {
    describe('when just name is given', function () {
      beforeEach(function () {
        test = adapter('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Adapter / my-bar /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith()
        })
      })
    })
  })

  describe('helper()', function () {
    describe('when just name is given', function () {
      beforeEach(function () {
        test = helper('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Helper / my-bar /')
      })
    })
  })
})
