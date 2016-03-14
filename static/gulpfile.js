var gulp = require('gulp');
var requireDir = require('require-dir');

/*
 * Global array for declaring
 * source JS files.
 */
paths = {
    'scripts': [
        'src/**/*.js'
    ],
    'transScripts': [
        'dist/**/*.js'
    ],
    'styles': [
        //'sass/**/*.sass',
        'less/**/*.less'
    ],
    'svg': [
        'src-svg/**/*.svg'
    ],
    'images': [
        'src-img/**/*'
    ]
};

requireDir('./gulp-tasks');
gulp.task('default', ['svgstore', 'imagemin', 'inject']);

/*
 * Watch tasks
 */
gulp.task('watch-js', function (cb) {
    return gulp.watch(paths.scripts, ['babel']);
});
gulp.task('watch-css', function (cb) {
    return gulp.watch(paths.styles, ['inject-css']);
});
gulp.task('watch-img', function (cb) {
    return gulp.watch(paths.images, ['imagemin']);
});
gulp.task('watch-svg', function (cb) {
    return gulp.watch(paths.svg, ['svgstore']);
});

gulp.task('watch', ['watch-js', 'watch-css', 'watch-svg', 'watch-img']);

