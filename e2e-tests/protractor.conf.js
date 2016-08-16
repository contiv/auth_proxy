exports.config = {

  capabilities: {
    'browserName': 'chrome'
  },
  seleniumServerJar: "../node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar",
  
  baseUrl: 'http://localhost:8080/',

  specs: ['./**/*.js'],

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