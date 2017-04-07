import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import svgstore from 'gulp-svgstore'
import path from 'path'
import del from 'del'
import rename from 'gulp-rename'
import getConfig from '../config/index'
import debug from 'debug'

const dbg = debug('Roadiz-front:svgmin  ')
dbg.color = debug.colors[4]

const config = getConfig()
const paths = config.utils_paths

gulp.task('clean-svg', () => {
    dbg('🗑  Cleaning sprite.')
    return del(path.resolve(config.svg_sprite_path, config.svg_sprite_name), {
        force: true
    })
})

gulp.task('build-svg', ['clean-svg'], () => {
    return gulp.src(paths.client(config.svg_paths))
        .on('end', () => {
            dbg(`🔨  ${config.svg_sprite_name} created.`)
        })
        .pipe(svgmin((file) => {
            const prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }, {
                    removeTitle: true
                }, {
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: true
                }, {
                    removeAttrs: {
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
        .pipe(rename((path) => {
            path.basename = 'icon-' + path.basename;
        }))
        .pipe(svgstore({
            cleanupdefs: true,
            includeTitleElement: false,
            id: 'base-icon-',
            inlineSvg: true
        }))
        .pipe(rename(config.svg_sprite_name))
        .pipe(gulp.dest(paths.views(config.svg_sprite_path)))
})

gulp.task('watch-svg', () => {
    dbg(`🕶  watching svg source folder : ${paths.client(config.svg_paths)}`)
    gulp.watch(paths.client(config.svg_paths), ['build-svg'])
})
