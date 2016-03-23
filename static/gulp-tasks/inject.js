var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('inject', ['css', 'requirejs'], function () {
    var builtFiles = gulp.src(['build/*', 'css/*']);

    return gulp.src('./../Resources/views/base.html.twig')
        .pipe(inject(builtFiles, {
            transform: function (filepath) {
                if (filepath.slice(-3) === '.js') {
                    return '<script data-main="{{ head.resourcesUrl }}' + filepath + '" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.22/require.min.js"></script>';
                }
                if (filepath.slice(-4) === '.css') {
                    return '<link rel="stylesheet" href="{{ head.resourcesUrl }}' + filepath + '">';
                }
                // Use the default transform as fallback:
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest('./../Resources/views/'));
});


gulp.task('inject-css', ['css'], function () {
    var builtFiles = gulp.src(['./css/*.css'], {read: false});

    return gulp.src('./../Resources/views/base.html.twig')
        .pipe(inject(builtFiles, {
            transform: function (filepath) {
                if (filepath.slice(-3) === '.js') {
                    return '<script data-main="{{ head.resourcesUrl }}' + filepath + '" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.22/require.min.js"></script>';
                }
                if (filepath.slice(-4) === '.css') {
                    return '<link rel="stylesheet" href="{{ head.resourcesUrl }}' + filepath + '">';
                }
                // Use the default transform as fallback:
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest('./../Resources/views/'));
});
