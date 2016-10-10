require('es6-promise').polyfill();
var postcss = require('gulp-postcss');
var gulp = require('gulp');

gulp.task('css', ['less-vendor', 'less'], function () {
    var processors = [
        require('postcss-fixes')(),
        require('postcss-filter-gradient')(),
        require('postcss-reduce-transforms')(),
        require('autoprefixer')({browsers: ['last 4 version', 'ie 11', 'ie 10', 'ie 9']}),
        require('css-mqpacker')(),
        require('cssnano')
    ];
    return gulp.src('./css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'));
});
