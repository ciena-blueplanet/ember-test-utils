# ember-test-utils

Ember testing utilities.

###### Dependencies

![Ember][ember-img]
[![NPM][npm-img]][npm-url]

###### Health

[![Travis][ci-img]][ci-url]
[![Coveralls][cov-img]][cov-url]

###### Security

[![bitHound][bithound-img]][bithound-url]

 * [Installation](#Installation)
 * [Getting Started](#Getting Started)
 * [Contributing](#Contributing)

## Installation

```
ember install ember-test-utils
```

## Getting Started

**ember-test-utils** provides a set of utilities to help you in testing Ember modules. This library requires you
use `ember-mocha` as your testing framework. It provides shortcuts for working with:

 * [`setupComponentTest`](#setupcomponenttest)
 * [`setupTest`](#setuptest)

Provided test helpers:

 * [`mockComponent`](#mockcomponent) - creates a mock component to easily test the component dependency
 injection pattern
 * [`stubService`](#stubservice) - allows you to stub a service

## `setupComponentTest`
Two shortcuts (`integration`, and `unit`) are provided to help transform

```js
import {render} from '@ember/test-helpers'
import {expect} from 'chai'
import {setupRenderingTest} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

describe('Integration / MyGreetingComponent', function () {
  setupRenderingTest()

  it('renders', async function () {
    this.set('name', 'John')
    await render(hbs`{{my-greeting name=name}}`)
    expect(this.element).to.not.equal(undefined)
  })
})
```

into

```js
import {render} from '@ember/test-helpers'
import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'
import {integration} from 'ember-test-utils/test-support/setup-component-test'

const test = integration('my-greeting')
describe(test.label, function () {
  test.setup()

  it('should render', async function () {
    this.set('name', 'John')
    await render(hbs`{{my-greeting name=name}}`)
    expect(this.element).to.not.equal(undefined)
  })
})
```

and

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('Unit / MyGreetingComponent', function () {
  setupTest()

  it('should exist', async function () {
    // creates the component instance
    let component = this.owner.__container__.factoryFor('component:my-greeting').create()

    expect(component).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'
import {unit} from 'ember-test-utils/test-support/setup-component-test'

const test = unit('my-greeting', ['component:foo', 'helper:bar'])
  context = test.setup()

  it('should exist', function () {
    // creates the component instance
    let component = context.subject.call(this)

    expect(component).not.to.equal(undefined)
  })
})
```

## `setupTest`
The following shortcuts are provided:

* [`adapter`](#adapter)
* [`controller`](#controller)
* [`helper`](#helper)
* [`model`](#model)
* [`module`](#module)
* [`route`](#route)
* [`serializer`](#serializer)
* [`service`](#service)

### `adapter`
The `adapter` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoAdapter', function () {
  setupTest()

  // Replace this with your real tests.
  it('exists', function () {
    const adapter = this.owner.lookup(`adapter:demo`)
    expect(adapter).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {adapter} from 'ember-test-utils/test-support/setup-test'

const test = adapter('demo', ['adapter:foo'])
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let adapter = this.subject()
    expect(adapter).not.to.equal(undefined)
  })
})
```

### `controller`
The `controller` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoController', function () {
  setupTest()

  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.owner.lookup('controller:demo')
    expect(controller).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {controller} from 'ember-test-utils/test-support/setup-test'

const test = controller('demo')
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject()
    expect(controller).not.to.equal(undefined)
  })
})
```

### `helper`
The `helper` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoHelper', function () {
  setupTest()

  // Replace this with your real tests.
  it('exists', function () {
    let helper = this.owner.lookup('helper:demo')
    expect(helper).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {helper} from 'ember-test-utils/test-support/setup-test'

const test = helper('demo')
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let helper = this.subject()
    expect(helper).not.to.equal(undefined)
  })
})
```

### `model`
The `model` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('Unit: PersonModel', function () {
  setupTest()

  it('exists', function () {
    let model = this.owner.lookup('model:person')
    expect(model).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {model} from 'ember-test-utils/test-support/setup-test'

const test = model('person')
describe(test.label, function () {
  test.setup()

  it('exists', function () {
    let model = this.subject()
    expect(model).not.to.equal(undefined)
  })
})
```

### `module`
The `module` helper is a catch-all to let you unit test any module, it allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoController', function () {
  setupTest()

  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject('controller:demo')
    expect(controller).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'
import {module} from 'ember-test-utils/test-support/setup-test'

const test = module('controller:demo')
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject()
    expect(controller).not.to.equal(undefined)
  })
})
```

### `route`
The `route` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoController', function () {
  setupTest()

  // Replace this with your real tests.
  it('exists', function () {
    let route = this.owner.lookup('route:demo')
    expect(route).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {route} from 'ember-test-utils/test-support/setup-test'

const test = route('demo')
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let route = this.subject()
    expect(route).not.to.equal(undefined)
  })
})
```

### `serializer`
The only difference between `model` and `serializer` is what the description of the test will end up being:

```
Unit / Model / model-name
```

vs.

```
Unit / Serializer / model-name
```

### `service`
The `service` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoService', function () {
  setupTest()

  // Replace this with your real tests.
  it('exists', function () {
    let service = this.owner.lookup('service:demo')
    expect(service).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {service} from 'ember-test-utils/test-support/setup-test'

const test = service('demo')
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let service = this.subject()
    expect(service).not.to.equal(undefined)
  })
})
```
## `mockComponent`
A helper to allow easy testing of the component dependency injection pattern. This helper will create a mock component
with the default name `mock-component`. The name can be set by passing a String `<name>` as the second parameter.
The third parameter allows you to pass any properties into the component as an Object `{classNames: 'my-classname'}`.
Credit goes to [poteto](https://twitter.com/sugarpirate_) for the initial implementation of this idea.

```handlebars
<h2>A component to demonstrate the mock component helper</h2>

{{#if injectComponent}}
  {{component injectComponent}}
{{/if}}

```

```js
import {render} from '@ember/test-helpers'
import {expect} from 'chai'
import {registerMockComponent, unregisterMockComponent} from 'ember-test-utils/test-support/mock-component'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = integration('demo-component')
describe(test.label, function () {
  test.setup()

  beforeEach(async function () {
    registerMockComponent(this)

    await render(hbs`
      {{demo-component
        injectComponent=(component 'mock-component')
      }}
    `)
  })

  afterEach(function () {
    unregisterMockComponent(this)
  })

  it('should render the injectComponent with default name', function () {
    expect(this.element).to.not.equal(undefined)
  })
})
```

or with a user provided `name` and `options: {}`

```js
import {render} from '@ember/test-helpers'
import {expect} from 'chai'
import {registerMockComponent, unregisterMockComponent} from 'ember-test-utils/test-support/mock-component'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = integration('demo-component')
describe(test.label, function () {
  test.setup()

  beforeEach(async function () {
    registerMockComponent(this, 'mock-inject', {
      classNames: 'mock-inject',
      title: 'My Title',
      layout: hbs`
        <h1>{{title}}</h1>
      `
    })

    await render(hbs`
      {{demo-component
        injectComponent=(component 'mock-inject')
      }}
    `)
  })

  afterEach(function () {
    unregisterMockComponent(this, 'mock-inject')
  })

  it('should render the injectComponent with provided layout', function () {
    expect(this.element.querySelector('.mock-inject').textContent).to.equal('My Title')
  })
})
```

## `stubService`
This helper will allow the easy creation of stubs for services. If a user wishes to stub the `store` the following [methods are setup by default](https://github.com/ciena-blueplanet/ember-test-utils/blob/master/addon-test-support/stub.js#L20-L59)


```js
import {expect} from 'chai'
import Ember from 'ember'
import {route} from 'ember-test-utils/test-support/setup-test'
import {stubService} from 'ember-test-utils/test-support/stub'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = route('demo', ['model:demo-user'])
describe(test.label, function () {
  test.setup()
  let route, sandbox, store, params
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    store = stubService(this, sandbox, 'store')
    route = this.subject()
  })

  afterEach(function () {
    sandbox.restore()
    sandbox = null
    route = null
    store = null
    params = null
  })

  describe('model()', function () {
    describe('when you set some properties', function () {
      beforeEach(function () {
        params = {
          filter: '[name]=',
          'page[limit]': 20,
          'page[offset]': 0,
          sort: '-last-modified-time'
        }
        route.model(params)
      })

      it('should query for user record with username', function () {
        expect(store.queryRecord).to.have.been.calledWith('demo-user', {username: 'username@someuser.com'})
      })
    })
  })
})
```

## Build Optimization

Out of box having `ember-test-utils` in your project will make your vendor.js asset slightly larger, as of 2017-02-15
 this increase in size is approximately 0.08 KB. If you want to keep this out of your build for certain environments
 you can add the following configuration to your `package.json`:

```json
{
  "ember-test-utils": {
    "excludeFromEnvironments": ["production"]
  }
}
```

## Custom Mocha Reporter

If you'd like to use the custom Mocha reporter provided by this addon then your `testem.js` file should look something
like this:

```js
var Reporter = require('ember-test-utils/reporter')

module.exports = {
  disable_watching: true,
  framework: 'mocha',
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  reporter: new Reporter(),
  test_page: 'tests/index.html?hidepassed'
}
```

> NOTE: This reporter will group test results into two sections: failed and passed. Each section is sorted from slowest
test to fastest test so you can see which tests are causing your CI to come to a crawl.

## Linting

### All File Types

If you want to lint your Dockerfile's, templates, Javascript, Markdown, and SASS
files you can simply run:

```bash
./node_modules/.bin/lint-all-the-things
```

or even better add the following script to your `package.json`:

```json
{
  "scripts": {
    "lint": "lint-all-the-things"
  }
}
```

and run

```bash
npm run lint-all-the-things
```

Many eslint errors and warnings can be automatically fixed using the `--fix` command line argument. For example,

```bash
./node_modules/.bin/lint-all-the-things --fix
```

```bash
npm run lint-all-the-things -- --fix
```

### Dockerfile

If you want to lint your template files you can simply run:

```bash
./node_modules/.bin/lint-docker
```

or even better add the following script to your `package.json`:

```json
{
  "scripts": {
    "lint-docker": "lint-docker"
  }
}
```

and run

```bash
npm run lint-docker
```

### Javascript

If you want to lint your Javascript files you can simply run:

```bash
./node_modules/.bin/lint-javascript
```

or even better add the following script to your `package.json`:

```json
{
  "scripts": {
    "lint-js": "lint-javascript"
  }
}
```

and run

```bash
npm run lint-js
```

If you would like any Javascript files to be ignored during linting simply create a `.eslintignore` file in the root
 of your project and populate it with one
[glob pattern](http://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories) per line.


### Markdown

If you want to lint your Markdown files you can simply run:

```bash
./node_modules/.bin/lint-markdown
```

or even better add the following script to your `package.json`:

```json
{
  "scripts": {
    "lint-md": "lint-markdown"
  }
}
```

and run

```bash
npm run lint-md
```

If you would like any Markdown files to be ignored during linting simply create a `.remarkignore` file in the root
 of your project and populate it with one
[glob pattern](https://github.com/unifiedjs/unified-engine/blob/master/doc/ignore.md) per line.



### Stylesheets (SASS)

If you want to lint your SASS files you can simply run:

```bash
./node_modules/.bin/lint-sass
```

or even better add the following script to your `package.json`:

```json
{
  "scripts": {
    "lint-sass": "lint-sass"
  }
}
```

and run

```bash
npm run lint-hbs
```

### Templates (HTMLBars)

If you want to lint your template files you can simply run:

```bash
./node_modules/.bin/lint-htmlbars
```

or even better add the following script to your `package.json`:

```json
{
  "scripts": {
    "lint-hbs": "lint-htmlbars"
  }
}
```

and run

```bash
npm run lint-hbs
```

By default the
[recommended ember-template-lint](https://github.com/rwjblue/ember-template-lint/blob/master/lib/config/recommended.js)
rules are enforced.  If you would like to enable/disable other rules, you can do so by creating a
`.template-lintrc.js` file in the root of your project per
[these instructions](https://github.com/rwjblue/ember-template-lint).


## Contributing

This following outlines the details of collaborating on this Ember addon:

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

[bithound-img]: https://www.bithound.io/github/ciena-blueplanet/ember-test-utils/badges/score.svg "bitHound"
[bithound-url]: https://www.bithound.io/github/ciena-blueplanet/ember-test-utils

[ember-img]: https://img.shields.io/badge/ember-2.3.0+-orange.svg "Ember 2.3.0+"

[ci-img]: https://img.shields.io/travis/ciena-blueplanet/ember-test-utils.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-blueplanet/ember-test-utils

[cov-img]: https://img.shields.io/coveralls/ciena-blueplanet/ember-test-utils.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-blueplanet/ember-test-utils

[npm-img]: https://img.shields.io/npm/v/ember-test-utils.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-test-utils
