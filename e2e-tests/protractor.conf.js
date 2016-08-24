exports.config = {

  capabilities: {
    'browserName': 'chrome'
  },

  seleniumServerJar: "../node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar",

  baseUrl: 'http://localhost:8080/',

  onPrepare: function() {
        browser.manage().window().setSize(1200, 1000);
    },

  specs: [
    './testConfiguration.js',
    './cleanup.js',
    './menu/*.js',
    './dashboard/*.js',
    './networks/*.js',
    './storage_policies/*.js',
    './volumes/*.js'
  ],

  framework: 'jasmine',


  params: {
    globBaseUrl: 'http://localhost:8080/'
  },

  jasmineNodeOpts: {
    showColors:true,
    defaultTimeoutInterval: 30000,
    isVerbose:true,
    includeStackTrace:true
  }
};