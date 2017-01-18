import gulp from 'gulp';
import less from 'gulp-less';
import path from 'path';
import del from 'del';
import rev from 'gulp-rev';
import plumber from 'gulp-plumber';

gulp.task('clean-less', () => {
    return del(['./css/style*.css']);
});

gulp.task('less', ['clean-less'], (cb) => {
    return gulp.src('./less/style.less')
        .pipe(plumber({
            errorHandler: (err) => {
                cb(err);
            }
        }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(rev())
        .pipe(gulp.dest('./css'));
});

gulp.task('clean-less-vendor', () => {
    return del(['./css/vendor*.css']);
});

gulp.task('less-vendor', ['clean-less-vendor'], (cb) => {
    return gulp.src('./less/vendor.less')
        .pipe(plumber({
            errorHandler: (err) => {
                cb(err);
            }
        }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(rev())
        .pipe(gulp.dest('./css'));
});
