var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var path = require('path');
var del = require('del');
var rename = require("gulp-rename");

gulp.task('clean-svg', function () {
    return del(['./../Resources/views/svg/sprite.svg.twig'], {
        force: true
    });
});
gulp.task('svgstore', ['clean-svg'], function () {
    return gulp.src(paths.svg)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [
                    {
                        cleanupIDs: {
                            prefix: prefix + '-',
                            minify: true
                        }
                    },
                    {
                        removeViewBox: false
                    },
                    {
                        removeUselessStrokeAndFill: true
                    },
                    {
                        removeAttrs:{
                            attrs: [
                                'fill',
                                'fill-rule',
                                'clip-rule',
                                'sketch:type',
                                'sketch:type',
                                'xmlns:sketch',
                                'xmlns:xlink'
                            ]
                        }
                    }
                ]
            }
        }))
        .pipe(rename(function (path) {
            path.basename = 'icon-' + path.basename;
        }))
        .pipe(svgstore({
            cleanupdefs:true,
            includeTitleElement:false,
            id:'base-icon-',
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg.twig"))
        .pipe(gulp.dest('../Resources/views/svg'));
});
