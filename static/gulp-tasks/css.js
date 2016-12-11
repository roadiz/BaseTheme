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
    if (process.env.NODE_ENV === 'production') {
        /*
         * Only use CSS processors in production
         */
        console.log('Optimized and cleaned CSS with PostCSS.');
        return gulp.src('./css/*.css')
            .pipe(postcss(processors))
            .pipe(gulp.dest('./css'));
    } else {
        console.log('No CSS optimization.');
        return gulp.src('./css/*.css').pipe(gulp.dest('./css'));
    }
});
