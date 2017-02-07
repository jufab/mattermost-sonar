var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var coveralls = require('coveralls');
var fs = require('fs');

gulp.task('pre-test', function () {
    return gulp.src(['server.js','src/*.js'])
    // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
    return gulp.src(['tests/src/*.js'])
        .pipe(mocha())
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports(
            {
                dir: '.',
                reporters: [ 'lcovonly','text', 'text-summary' ],
                reportOpts: {
                    lcov: {dir: 'lcovonly', file: 'lcov.info'}
                },
            }
        ))
        // Enforce a coverage of at least 80%
        .pipe(istanbul.enforceThresholds({thresholds: {global: 80}}))
});

gulp.task('cover-travisci', function() {
    coveralls.getOptions = coveralls.getBaseOptions;
    var fileName = './lcov.info';
    fs.readFile(fileName, 'utf8', function(err, fileContent) {
        if (err) {
            console.error("Failed to read file '" + fileName + "', with error: " + err);
            return false;
        }

        coveralls.handleInput(fileContent, function(err) {
            if (err) {
                console.error("Failed to submit '" + fileName + "' to coveralls: " + err);
                return false;
            }
        });
    });

});


/*
function sendCoveralls() {
    var fileContent = fs.readFile('lcov.info', 'utf8');
    coveralls.handleInput(fileContent);
}*/

/*gulp.task('cover', function() {

    fs.readFile('lcov.info', 'utf8')

})*/

/*gulp.task('test',  () =>
    gulp.src(['tests/src/*-test.js'], {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'list'}))
);*/