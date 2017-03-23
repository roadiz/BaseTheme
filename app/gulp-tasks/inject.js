import fs from 'fs';
import gulp from 'gulp';
import inject from 'gulp-inject';
/*
 * Needed to invert JS order and
 * load vendor before app
 */
import naturalSort from 'gulp-natural-sort';

const injectFileBasePath = '../Resources/views/partials';
const cssFilePath = '/css-inject.html.twig';
const jsFilePath = '/js-inject.html.twig';

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

gulp.task('create-css-inject', () => {
    const cssFileContent = `
        <!-- inject:css -->
        <!-- endinject -->
    `;

    // Create folder if not exist
    if (!fs.existsSync(injectFileBasePath)) {
        fs.mkdirSync(injectFileBasePath)
    }

    // Create file if not exist
    if (!fs.existsSync(injectFileBasePath + cssFilePath)) {
        fs.writeFileSync(injectFileBasePath + cssFilePath, cssFileContent, {
            mode: 0o644
        })
    }
})

gulp.task('create-js-inject', () => {
    const jsFileContent = `
        <!-- inject:js -->
        <!-- endinject -->
    `;

    // Create folder if not exist
    if (!fs.existsSync(injectFileBasePath)) {
        fs.mkdirSync(injectFileBasePath)
    }

    // Create file if not exist
    if (!fs.existsSync(injectFileBasePath + jsFilePath)) {
        fs.writeFileSync(injectFileBasePath + jsFilePath, jsFileContent, {
            mode: 0o644
        })
    }
})

gulp.task('inject', ['inject-js', 'inject-css']);

gulp.task('inject-js', ['create-js-inject', 'webpack'], () => {
    const builtFiles = gulp.src(['build/*', 'css/vendor-*.css', 'css/style-*.css'], {read: false})
        .pipe(naturalSort('desc'));

    return gulp.src(injectFileBasePath + jsFilePath)
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest(injectFileBasePath));
});

gulp.task('inject-css', ['create-css-inject', 'css'], () => {
    const builtFiles = gulp.src(['build/*', 'css/vendor-*.css', 'css/style-*.css'], {read: false})
        .pipe(naturalSort('desc'));

    return gulp.src(injectFileBasePath + cssFilePath)
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest(injectFileBasePath));
});
