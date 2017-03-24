import Promise from 'es6-promise';
import postcss from 'gulp-postcss';
import gulp from 'gulp';
import postcssFixes from 'postcss-fixes';
import postcssFilterGradient from 'postcss-filter-gradient';
import postcssReduceTransform from 'postcss-reduce-transforms';
import autoprefixer from 'autoprefixer';
import cssMqpacker from 'css-mqpacker';
import cssnano from 'cssnano';
import themePaths from './themePaths';

Promise.polyfill();
const production = process.env.NODE_ENV === 'production';

gulp.task('css', ['less'], () => {
    const processors = [
        postcssFixes(),
        postcssFilterGradient(),
        postcssReduceTransform(),
        autoprefixer({browsers: ['last 2 version', 'ie 11', 'ie 10']}),
        cssMqpacker(),
        cssnano
    ];
    if (production) {
        /*
         * Only use CSS processors in production
         */
        console.log('Optimized and cleaned CSS with PostCSS.');
        return gulp.src(themePaths.distStyles + '/*.css')
            .pipe(postcss(processors))
            .pipe(gulp.dest(themePaths.distStyles));
    } else {
        console.log('No CSS optimization.');
        return gulp.src(themePaths.distStyles + '/*.css').pipe(gulp.dest(themePaths.distStyles));
    }
});
