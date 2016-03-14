var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('babel', ['lint'], function(cb) {
    return gulp.src(paths.scripts)
        .pipe(plumber({
            handleError: function (err) {
                cb(err);
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-es2015-modules-amd'],
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});
