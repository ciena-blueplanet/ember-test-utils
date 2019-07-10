# 9.1.1 (2019-07-10)

* Fixed `unit` from `setup-component-test` to initialize components with supplied properties in `subject(overrides)`
* Updated documentation to show the correct way to call test helpers
* Removed old test that no longer applies due to how tests are boot up


# 9.1.0 (2019-02-27)

* Upgrade eslint-plugin-ember-standard


# 10.0.1 (2018-10-04)
- Run codemod to convert ember-decorators to ember-macro-helpers
- Change dependencies and babel plugins

# 10.0.0 (2018-10-02)
* **Upgraded** Ember and Ember-cli to 3.3


# 9.0.0 (2018-09-28)

* Update eslint config standard for Ember 3

# 8.1.2 (2018-07-20)

* **Fixed** Travis API key.


# 8.1.1 (2018-03-07)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `eslint-config-frost-standard` to `^9.0.1`
* **Updated** `package-lock.json` file

# 8.1.0 (2017-12-28)
* **Added** ability to specify `--fix` with lint-all-the-things to automatically apply eslint fixes


# 8.0.0 (2017-12-19)
* **Updated** to version `^5.1.7` of `ember-cli-babel`
* **Removed** unused `ember-disable-proxy-controllers package` package
* **Updated** to version `^3.1.1` of `node-yaml`
* **Updated** to version `^2.14.0` of `sinon-chai`
* **Updated** to version `0.14.4` of `ember-cli-mocha`
* **Updated** to version `0.4.3` of `ember-cli-chai`
* **Updated** to version `^0.7.0` of `ember-sinon`
* **Updated** by pinning to version `0.3.12` of `ember-cli-code-coverage`
* **Updated** to version `^9.0.0` of `eslint-config-frost-standard`
* **Updated** stub methods to use new `callsFake()` since old method has been deprecated
* **Updated** linting to ignore the `CHANGELOG.md` file
* **Removed** unused `chai-query` package
* **Updated** to version `^4.11.0` of `eslint`


# 7.0.3 (2017-12-18)
* **Removed** unused `ember-lodash-shim` package
* **Removed** unused `lodash-es` package

# 7.0.2 (2017-12-11)
* **Removed** `included` hook from `index.js` since it was not being used to add additional functionality.

# 7.0.1 (2017-11-21)
* **Updated** travis CI and pr-bumper publishing scripts


# 7.0.0 (2017-11-21)
* **Added** `bower` to devDependencies since it is no longer provided by Ember CLI
* **Updated** `ember-cli-htmlbars-inline-precompile` to pinned version per conflict with `ember-cli-code-coverage`
* **Updated** to version 2 of `chalk`
* **Updated** to version of ^0.2.7 `dockerfile_lint`
* **Updated** to version ^0.8.12 of `ember-template-lint`
* **Updated** to version 8 of `eslint-config-frost-standard`

# 6.0.0 (2017-07-24)
* **Upgraded** `eslint-config-frost-standard` to `^7.0.0` (without this, consumers can't go past `6.x` b/c even if they have `7.0` in their `package.json`, `ember-test-utils` will get it's own `6.x` version that it will use instead. 
* **Fixed**: Issue with using `.eslintrc.js` in this repo (Resolves [#86](https://github.com/ciena-blueplanet/ember-test-utils/issues/86))


# 5.1.2 (2017-06-27)
* **Updated** the build scripts to publish under `ember-default`
Listing changes that were not picked up from previous PR: https://github.com/ciena-blueplanet/ember-test-utils/pull/85
* **Updated** to Ember CLI 2.12.3 and Ember 2.12.x
* **Updated** ember-try config matrix with Ember LTS 2.8
* **Updated** travis.yml build matrix to run Ember LTS 2.8 and default (Ember LTS 2.12) 

# 5.1.1 (2017-06-02)
* **Fixed** bug where `lint-all-the-things` exited with `0` even with `htmlbars` lint errors (resolves [#82](https://github.com/ciena-blueplanet/ember-test-utils/issues/82))


# 5.1.0 (2017-05-26)
 * **Added** `docs/**/*.md` to the default file locations covered by `lint-markdown`


# 5.0.0 (2017-05-26)
 * **Update** `engine` in `package.json` to `>=6.9.1`. We've only been testing on `6.9.1` and `stable` anyway, but this makes it official that we don't suport `node@5` anymore. 
* **Addedd** the ability for `lint-javascript` and `lint-htmlbars` to accept a single file to lint on the command line. This is to enable the new `ember-cli-frost-blueprints` to lint the files it generates one at a time and get specific errors for only the file in question. 


# 4.3.2 (2017-05-10)
* Closes #75 


# 4.3.1 (2017-05-10)
* Closes #73 


# 4.3.0 (2017-05-10)
* Respect `.remarkignore` file for `lint-markdown`
* **Changed** `maximum-line-length` for Markdown linter to 120
* Document ability to use `.eslintignore` file with Javascript linter
* **Fixed** link in documentation
* **Fixed** [#67](https://github.com/ciena-blueplanet/ember-test-utils/issues/67)
* **Fixed** [#65](https://github.com/ciena-blueplanet/ember-test-utils/issues/65)


# 4.2.0 (2017-05-08)
* **Added** mock-component helper that is being used to test component dependency injection patterns in frost repos
* **Added** tests for mock-component helper
* **Updated** README to document `mock-component` helper
* **Updated** README to document `adapter`, `helper` and `service` module test helpers
* **Updated** README to document `stubService` helper

# 4.1.1 (2017-05-05)
* **Updated** bower packages to npm packages
* **Updated** ember-try config to work with npm ember-source
* **Updated** path to resolver
* **Removed** unneeded files and config from `ember-cli-mirage` which is no longer installed

# 4.1.0 (2017-05-05)

* **Added** more test setup helpers to support other common modules that utilizes the factory (services, adapters, helpers)


# 4.0.0 (2017-03-23)

* **Upgraded** to eslint-config-frost-standard 6.x


# 3.0.0
* **Removed** `ember-intl` helpers since they didn't seem to be working anymore anyway, and we're not sure we want to encourage `ember-intl` over `ember-i18n` yet
* **Removed** `ember-data` helpers `stubStore` and `returnPromiseWithArgs` they have been replaced with `stubService` and `returnPromiseFromStub` out of the `stub` module now.
* **Added** `stub` helper module that contains `stubService` and `returnPromiseFromStub` methods: 
  ```js
  import {returnPromiseFromStub, stubService} from 'ember-test-utils/test-support/stub'
  ```
* **Added** `actions` helpers that currently just has `callAction` helper method for calling an action in tests.


# 2.0.0
## Breaking Changes
 * **Moved** helpers from `test-support` to `addon-test-support` so the way they are consumed has changed. See [#40](https://github.com/ciena-blueplanet/ember-test-utils/issues/40) for details. 
 * **Removed** deprecated `describeComponent` style helpers (See [#11](https://github.com/ciena-blueplanet/ember-test-utils/issues/11) for details)
* **Fixed** an issue where the `serializer` helper was adding a `model:foo` to the `dependencies` automatically instead of a `serializer:foo`. Since we use `setupModelTest` it should be the `serializer` that gets added as a dependency, not the `model`, since that will already be loaded via the `setupModelTest` method. 


# 1.11.0

* **Replaced** bower dependencies with node dependencies.
* **Updated** `ember-lodash-shim` to version `2.0.0` which shaves over 150 KB off of production builds.


# 1.10.7
**Added** `chalk` to dependencies


# 1.10.6

* Attempt to fix build by disable dependency snapshot which is causing build to fail and not publish.


# 1.10.5

* **Fixed** build to only bump on default Ember.


# 1.10.4

* **Fixed** build so it'll publish.

# 1.10.3

* **Fixed** bug in Javascript linter around ESLint inconsistency with `globals` key. In a `.eslintrc` config it expects `globals` to be an object but when using the `CLIEngine` it expects an array.


# 1.10.2

* **Fixed** markdown linter to use correct default config file.


# 1.10.1

* **Fixed** `lint-sass` to use `.sass-lint.yml` instead of `.sass-lint.json` as that is what in editor linting expects
to be present.


# 1.10.0

* **Added** new Node executables for linting: `lint-all-the-things`, `lint-docker`, `lint-htmlbars` (previously
  `template-lint`), `lint-javascript`, `lint-markdown`, and `lint-sass`.


# 1.9.0

* **Added** new `template-lint` executable for linting HTMLBars templates.


# 1.8.0

* **Added** `ember-lodash-shim` configuration to optimize build to only include necessary `lodash` methods.
* **Added** `ember-disable-prototype-extensions` to ensure addon isn't depending on Ember's prototype extensions.


# 1.7.0

* **Added** dots to test reporter so it is visually obvious tests are executing.


# 1.6.1

* **Upgraded** to test against Ember 2.11.


# 1.6.0

* **Removed** files from npm package that aren't necessary (all of the various config files).
* **Updated** dependencies to latest versions.


# 1.5.1
* Change CI browser example in *README.md* to match `ember-frost-core` usage

# 1.5.0
* **Added** a helper to stub out the ember-data store and make it easy to fake responses to calls to the store.
* **Updated** the dummy route and unit test for route to utilize the ember-data helper.

# 1.4.0

* **Added** support to automatically add `ember-intl` dependencies to unit tests that specify `service:intl` in their
dependencies
* **Updated** lint rules and fixed new warnings


# 1.3.2

* **Fixed** custom reporter to work for consumers using Node 5.


# 1.3.1
* **Added** tests for use with old versions of ember
* **Fixed** issue when used with `ember@2.3` (no `Ember.assign` available)


# 1.3.0
* **Updated** - `ember-mocha` dependency
* **Added** - Helpers to make using `setupTest()`, `setupComponentTest()` and `setupModelTest()` easier.
* **Deprecated** - the `describeComponent()`, `describeModel()` and `describeModule()` helpers
* **Deprecated** - the `diffObject()` method (we'll hopefully incorporate it into a chai addon soon, see #12)

# 1.2.2

* **Fixes** issue where skipped test conditions were being *skipped` since it was actually *pending*


# 1.2.1

* **Improved** custom mocha reporter to show failures as they occur and only show passed tests when all pass (now
  sorting fastest to slowest to reduce a user from having to scroll as much in their terminal).

<!--lint disable maximum-line-length-->

When there are failures without stack traces it'll look like this:
<img width="1205" alt="screen shot 2016-12-01 at 3 00 46 pm" src="https://cloud.githubusercontent.com/assets/422902/20816671/639871d8-b7d8-11e6-86e9-e85830e87a37.png">

When there are failures with stack traces it'll look like this:
<img width="1146" alt="screen shot 2016-12-01 at 3 08 34 pm" src="https://cloud.githubusercontent.com/assets/422902/20816680/6c772c68-b7d8-11e6-814e-92bc9a15b961.png">

When all tests pass it'll look like this:
<img width="1270" alt="screen shot 2016-12-01 at 2 06 57 pm" src="https://cloud.githubusercontent.com/assets/422902/20814645/71377978-b7cf-11e6-9b6d-01d682e448be.png">

<!--lint enable maximum-line-length-->

# 1.2.0

* **Added** custom mocha reporter which can be used by consumers.


# 1.1.2

- **Fixed** generated test names to use `/` instead of `|` as the test name separator, grep-ing the interactive web
app can link to unique tests.


# 1.1.1
* **Fixed** test descriptions to be consistent in the format of `Unit | Component | my-component` instead of
`Unit: MyComponentComponent` so that `grep`-ing for your component name will actually find tests for your component
now.
 * **Added** unit tests for the helpers themselves to make sure descriptions remain correct.

# 1.1.0
*  **Added** a `serializer` shortcut to the `describe-model` module which yields a
`Unit | Serializer | model-name` description compared to the `Unit | Model | model-name` that the `model` shortcut
yields.



# 1.0.0
## Breaking Changes
 * **Removed** `registryHelper` functionality (it isn't as necessary/useful with the introduction of `ember-hook`
 to make things less brittle.
 * **Moved** remaining code to `test-support/helpers/ember-test-utils` so consumers can have it injected into
 `tests/helpers` instead of treating it like a normal addon which will have code injected into the main app code tree.

## Non-breaking changes
 * **Added** helpers for `describeComponent` to make writing unit and integration tests easier
 * **Added** helpers for `describeModel` to make writing unit tests easier
 * **Added** helpers for `describeModule` to make writing uni tests easier.

# 0.2.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`
