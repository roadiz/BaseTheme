var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
var rev = require('gulp-rev');
var plumber = require('gulp-plumber');

gulp.task('clean-less', function () {
    return del(['./css/style*.css']);
});

gulp.task('less', ['clean-less'], function (cb) {
    return gulp.src('./less/style.less')
        .pipe(plumber({
            errorHandler: function(err) {
                cb(err);
            }
        }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(rev())
        .pipe(gulp.dest('./css'));
});

gulp.task('clean-less-vendor', function () {
    return del(['./css/vendor*.css']);
});

gulp.task('less-vendor', ['clean-less-vendor'], function (cb) {
    return gulp.src('./less/vendor.less')
        .pipe(plumber({
            errorHandler: function(err) {
                cb(err);
            }
        }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(rev())
        .pipe(gulp.dest('./css'));
});