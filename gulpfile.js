var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test',  () => 
    gulp.src(['tests/src/*-test.js'], {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'list'}))
);