const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    retries: {
      runMode: 1,
      openMode: 0
    },
    // env: {
    //   'USER_EMAIL': 'michael.krasnovskyi+testUser1@gmail.com'
    // },
    // viewportHeight: 2000,
    // viewportWidth: 2000
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true
  },
});
