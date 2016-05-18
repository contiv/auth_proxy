module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/semantic/dist/semantic.js',
            'app/bower_components/lodash/dist/lodash.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/components/models/module.js',
            'app/components/directives/module.js',
            'app/components/utils/module.js',
            'app/components/**/*.js',
            'app/networks/module.js',//Needed because jasmine is unable to locate the contiv.networks module which is defined here
            'app/networks/**/*.js',
            'app/network_policies/module.js',
            'app/network_policies/**/*.js',
            'app/applicationgroups/module.js',
            'app/applicationgroups/**/*.js',
            'app/service_lbs/module.js',
            'app/service_lbs/**/*.js',
            'app/nodes/module.js',
            'app/nodes/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
