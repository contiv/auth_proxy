var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eventStream = require('event-stream');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('build', function () {
    var s1 = gulp.src(['app/components/**/module.js',//First include files that register shared modules
            'app/**/module.js',//Include files that register modules for various tabs
            'app/app.js',
            'app/**/*.js',
            '!app/bundle.js',//Exclude generated bundle.js
            '!app/**/*test.js',//Exclude test files
            '!app/**/*.md', //Exclude .md files
            '!app/bower_components/**/*.js',
            '!app/components/graphobjects/**/*.js',
            '!app/main.browser.js',//Exclude files loaded by webpack
            '!app/app.module.js',//Exclude files loaded by webpack
            '!app/upgradeadapter.js',
            '!app/polyfills.browser.js',//Exclude files loaded by webpack
            '!app/vendor.browser.js',//Exclude files loaded by webpack
            '!app/polyfills.bundle.js',//Exclude bundle generated by webpack
            '!app/vendor.bundle.js',//Exclude bundle generated by webpack
            '!app/main.bundle.js',//Exclude bundle generated by webpack
            '!app/components/models/*model.js',
            '!app/components/models/basecollection.js',
            '!app/components/models/collection.js',
            '!app/components/utils/*service.js',
            '!app/components/directives/directives.module.js',
            '!app/components/directives/errormessagedirective.js',
            '!app/dashboard/dashboardctrl.js',
            '!app/network_policies/networkpolicies.module.js',
            '!app/network_policies/isolationpolicycreatectrl.js',
            '!app/network_policies/bandwidthpolicycreatectrl.js'
            ])//Exclude vendor libraries
        .pipe(sourcemaps.init());
    //ES6 code
    var s2 = gulp.src(['app/components/graphobjects/**/module.js',
            'app/components/graphobjects/**/*.js',
            '!app/components/graphobjects/**/*test.js',
            '!app/components/graphobjects/**/*.md'
            ])//Exclude vendor libraries
        .pipe(sourcemaps.init())
        .pipe(babel());

    //merge the two streams
    eventStream.merge(s1, s2)
        .pipe(concat('app/bundle.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});

gulp.task('dev-build', function () {
    var s1 = gulp.src(['app/components/**/module.js',//First include files that register shared modules
            'app/**/module.js',//Include files that register modules for various tabs
            'app/app.js',
            'app/**/*.js',
            '!app/bundle.js',//Exclude generated bundle.js
            '!app/**/*test.js',//Exclude test files
            '!app/**/*.md', //Exclude .md files
            '!app/bower_components/**/*.js',
            '!app/components/graphobjects/**/*.js',
            '!app/main.browser.js',//Exclude files loaded by webpack
            '!app/app.module.js',//Exclude files loaded by webpack
            '!app/upgradeadapter.js',
            '!app/polyfills.browser.js',//Exclude files loaded by webpack
            '!app/vendor.browser.js',//Exclude files loaded by webpack
            '!app/polyfills.bundle.js',//Exclude bundle generated by webpack
            '!app/vendor.bundle.js',//Exclude bundle generated by webpack
            '!app/main.bundle.js',//Exclude bundle generated by webpack
            '!app/components/models/*model.js',
            '!app/components/models/basecollection.js',
            '!app/components/models/collection.js',
            '!app/components/utils/*service.js',
            '!app/components/directives/directives.module.js',
            '!app/components/directives/errormessagedirective.js',
            '!app/dashboard/dashboardctrl.js',
            '!app/network_policies/networkpolicies.module.js',
            '!app/network_policies/isolationpolicycreatectrl.js',
            '!app/network_policies/bandwidthpolicycreatectrl.js'
            ])//Exclude vendor libraries
        .pipe(sourcemaps.init());
    //ES6 code
    var s2 = gulp.src(['app/components/graphobjects/**/module.js',
            'app/components/graphobjects/**/*.js',
            '!app/components/graphobjects/**/*test.js',
            '!app/components/graphobjects/**/*.md'
            ])//Exclude vendor libraries
        .pipe(sourcemaps.init())
        .pipe(babel());

    //merge the two streams
    eventStream.merge(s1, s2)
        .pipe(concat('app/bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'));
});


gulp.task('watch', ['build'], function () {
    gulp.watch('app/**/*.js', ['build'])
});
