var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function () {
    gulp.src(['app/components/**/module.js',//First include files that register shared modules
            'app/**/module.js',//Include files that register modules for various tabs
            'app/app.js',
            'app/**/*.js',
            '!app/bundle.js',//Exclude generated bundle.js
            '!app/**/*test.js',//Exclude test files
            '!app/bower_components/**/*.js'])//Exclude vendor libraries
        .pipe(sourcemaps.init())
        .pipe(concat('app/bundle.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});

gulp.task('watch', ['build'], function () {
    gulp.watch('app/**/*.js', ['build'])
});
