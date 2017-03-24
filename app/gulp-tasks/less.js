import gulp from 'gulp';
import less from 'gulp-less';
import path from 'path';
import del from 'del';
import rev from 'gulp-rev';
import plumber from 'gulp-plumber';
import themePaths from './themePaths';

gulp.task('clean-less', () => {
    return del(themePaths.distStyles);
});

gulp.task('less', ['clean-less'], (cb) => {
    return gulp.src(themePaths.entryStyle)
        .pipe(plumber({
            errorHandler: (err) => {
                cb(err);
            }
        }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(rev())
        .pipe(gulp.dest(themePaths.distStyles));
});
