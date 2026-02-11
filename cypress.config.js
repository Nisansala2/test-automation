const { defineConfig } = require("cypress");
const fs = require('fs');

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
      on('task', {
        isFileExist(filePath) {
          return fs.existsSync(filePath);
        }
      });
      // implement node event listeners here
    },
  },
});
