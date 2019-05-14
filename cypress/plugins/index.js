// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  console.log('cypress plugin index config >>>>>');
  console.log(config); // see what all is in here!

  // modify config values
  config.defaultCommandTimeout = 10000;
  config.baseUrl = 'https://pierpontglobal.com';

  // modify env var value
  config.env.ENVIRONMENT = 'production';

  // return config
  return config;
};
