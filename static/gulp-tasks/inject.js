var gulp = require('gulp');
var inject = require('gulp-inject');

var transformFunc = function (filepath) {
    if (filepath.slice(-3) === '.js') {
        if (filepath.charAt(0) === '/') filepath = filepath.substr(1);
        return '<script src="{{ head.resourcesUrl }}' + filepath + '"></script>';
    }
    if (filepath.slice(-4) === '.css') {
        if (filepath.charAt(0) === '/') filepath = filepath.substr(1);
        return '<link rel="stylesheet" href="{{ head.resourcesUrl }}' + filepath + '">';
    }
    // Use the default transform as fallback:
    return inject.transform.apply(inject.transform, arguments);
};

gulp.task('inject', ['css', 'webpack'], function () {
    var builtFiles = gulp.src(['build/*', 'css/vendor-*.css','css/style-*.css'], {read: false});

    return gulp.src('./../Resources/views/base.html.twig')
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest('./../Resources/views/'));
});

gulp.task('inject-js', ['webpack'], function () {
    var builtFiles = gulp.src(['build/*', 'css/vendor-*.css','css/style-*.css'], {read: false});

    return gulp.src('./../Resources/views/base.html.twig')
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest('./../Resources/views/'));
});

gulp.task('inject-css', ['css'], function () {
    var builtFiles = gulp.src(['build/*', 'css/vendor-*.css','css/style-*.css'], {read: false});

    return gulp.src('./../Resources/views/base.html.twig')
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest('./../Resources/views/'));
});
