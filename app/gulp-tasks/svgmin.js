import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import path from 'path';
import del from 'del';
import rename from "gulp-rename";
import themePaths from './themePaths';

gulp.task('clean-svg', () => {
    return del([themePaths.svgSpriteFolder + '/' + themePaths.svgSpriteFilename], {
        force: true
    });
});
gulp.task('svgstore', ['clean-svg'], () => {
    return gulp.src(themePaths.svg)
        .pipe(svgmin(function (file) {
            const prefix = path.basename(file.relative, path.extname(file.relative));
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
        .pipe(rename(themePaths.svgSpriteFilename))
        .pipe(gulp.dest(themePaths.svgSpriteFolder));
});
