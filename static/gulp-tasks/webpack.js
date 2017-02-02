import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import plumber from 'gulp-plumber';
import del from 'del';
import named from 'vinyl-named';
import themePaths from './themePaths';
import webpackConfig from '../webpack.config.js';

const production = process.env.NODE_ENV === 'production';

gulp.task('clean-build', () => {
    return del(themePaths.distScripts);
});

gulp.task('webpack', ['clean-build'], (cb) => {

    return gulp.src(themePaths.entry)
        .pipe(plumber({
            handleError: (err) => {
                cb(err);
            }
        }))
        .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest(themePaths.distScripts));
});
