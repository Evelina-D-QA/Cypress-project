const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
		retries: {
			runMode: 1,
			openMode: 0,
		},
		env: {
			USER_EMAIL: 'evie.maier.w+user5@gmail.com',
			USER_PASSWORD: 'Gf6757jhvjdhsmf',
		},

		defaultCommandTimeout: 10000,
		pageLoadTimeout: 30000,
		video: true,
		screenshotOnRunFailure: true,
	},
});
