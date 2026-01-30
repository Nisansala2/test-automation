const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'eraj8g',
  e2e: {
    watchForFileChanges: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    chromeWebSecurity: false,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
