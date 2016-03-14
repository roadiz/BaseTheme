require('es6-promise').polyfill();
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

gulp.task('css', ['less-vendor', 'less'], function () {
    var processors = [
        autoprefixer({browsers: ['last 3 version', 'ie 9']}),
        mqpacker,
        csswring
    ];
    return gulp.src('./css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'));
});
