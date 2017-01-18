import gulp from 'gulp';
import inject from 'gulp-inject';
/*
 * Needed to invert JS order and
 * load vendor before app
 */
import naturalSort from 'gulp-natural-sort';

const transformFunc = (filepath) => {
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

gulp.task('inject', ['css', 'webpack'], () => {
    const builtFiles = gulp.src(['build/*', 'css/vendor-*.css','css/style-*.css'], {read: false})
                            .pipe(naturalSort('desc'));

    return gulp.src('./../Resources/views/base.html.twig')
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest('./../Resources/views/'));
});

gulp.task('inject-js', ['webpack'], () => {
    const builtFiles = gulp.src(['build/*', 'css/vendor-*.css','css/style-*.css'], {read: false})
        .pipe(naturalSort('desc'));

    return gulp.src('./../Resources/views/base.html.twig')
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest('./../Resources/views/'));
});

gulp.task('inject-css', ['css'], () => {
    const builtFiles = gulp.src(['build/*', 'css/vendor-*.css','css/style-*.css'], {read: false})
        .pipe(naturalSort('desc'));

    return gulp.src('./../Resources/views/base.html.twig')
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest('./../Resources/views/'));
});
