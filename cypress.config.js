const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'eraj8g',
  e2e: {
    experimentalStudio: false, // enable studio
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
