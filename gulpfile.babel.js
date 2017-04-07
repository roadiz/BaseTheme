/*
import gulp from 'gulp';
import requireDir from 'require-dir';
import themePaths from './app/gulp-tasks/themePaths';

requireDir('./app/gulp-tasks');
gulp.task('default', ['svgstore', 'imagemin', 'inject']);

/!*
 * Watch tasks
 *!/
gulp.task('watch-js', function (cb) {
    return gulp.watch(themePaths.scripts, ['inject-js']);
});
gulp.task('watch-css', function (cb) {
    return gulp.watch(themePaths.styles, ['inject-css']);
});
gulp.task('watch-img', function (cb) {
    return gulp.watch(themePaths.images, ['imagemin']);
});
gulp.task('watch-svg', function (cb) {
    return gulp.watch(themePaths.svg, ['svgstore']);
});

gulp.task('watch', ['watch-js', 'watch-css', 'watch-svg', 'watch-img']);

*/
import requireDir from 'require-dir'

requireDir('./build/gulp-tasks')
