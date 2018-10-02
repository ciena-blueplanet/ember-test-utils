/* eslint-env node */
module.exports = {
  scenarios: [
    {
      name: 'ember-lts-2.8',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-8'
        },
        resolutions: {
          'ember': 'lts-2-8'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-212',
      npm: {
        devDependencies: {
          'ember-source': '2.12.2'
        }
      }
    },
    {
      name: 'ember-default',
      npm: {
        devDependencies: {}
      }
    }
  ]
}
