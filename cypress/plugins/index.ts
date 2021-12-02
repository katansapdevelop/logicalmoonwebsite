const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin')
/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = (on, config) => {
  getCompareSnapshotsPlugin(on, config)
  return Object.assign({}, config, {
    fixturesFolder: 'cypress/fixtures',
    integrationFolder: 'cypress/specs',
    screenshotsFolder: 'cypress/screenshots',
    supportFile: 'cypress/support/index.ts',
  })
}

// import type Cypress from 'cypress';
// import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin';

// export default function configurePlugins(
//   on: Cypress.PluginEvents,
//   config: Cypress.PluginConfigOptions,
// ) {
//   getCompareSnapshotsPlugin(on, config);
// }
