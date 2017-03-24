import fs from 'fs';
import gulp from 'gulp';
import inject from 'gulp-inject';
import themePaths from './themePaths';
/*
 * Needed to invert JS order and
 * load vendor before app
 */
import naturalSort from 'gulp-natural-sort';

const transformFunc = (filepath) => {
    if (filepath.slice(-3) === '.js') {
        filepath = filepath.replace(/^\/static\//,"");
        return '<script src="{{ head.resourcesUrl }}' + filepath + '"></script>';
    }
    if (filepath.slice(-4) === '.css') {
        filepath = filepath.replace(/^\/static\//,"");
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
    if (!fs.existsSync(themePaths.injectFilePath)) {
        fs.mkdirSync(themePaths.injectFilePath)
    }

    // Create file if not exist
    if (!fs.existsSync(themePaths.injectFilePath + themePaths.cssFilePath)) {
        fs.writeFileSync(themePaths.injectFilePath + themePaths.cssFilePath, cssFileContent, {
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
    if (!fs.existsSync(themePaths.injectFilePath)) {
        fs.mkdirSync(themePaths.injectFilePath)
    }

    // Create file if not exist
    if (!fs.existsSync(themePaths.injectFilePath + themePaths.jsFilePath)) {
        fs.writeFileSync(themePaths.injectFilePath + themePaths.jsFilePath, jsFileContent, {
            mode: 0o644
        })
    }
})

gulp.task('inject', ['inject-js', 'inject-css']);

gulp.task('inject-js', ['create-js-inject', 'webpack'], () => {
    const builtFiles = gulp.src(themePaths.injectedFiles, {read: false})
        .pipe(naturalSort('desc'));

    return gulp.src(themePaths.injectFilePath + themePaths.jsFilePath)
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest(themePaths.injectFilePath));
});

gulp.task('inject-css', ['create-css-inject', 'css'], () => {
    const builtFiles = gulp.src(themePaths.injectedFiles, {read: false})
        .pipe(naturalSort('desc'));

    return gulp.src(themePaths.injectFilePath + themePaths.cssFilePath)
        .pipe(inject(builtFiles, {
            transform: transformFunc
        }))
        .pipe(gulp.dest(themePaths.injectFilePath));
});
