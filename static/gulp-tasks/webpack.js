import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import plumber from 'gulp-plumber';
import del from 'del';
import named from 'vinyl-named';
import themePaths from './themePaths';
const production = process.env.NODE_ENV === 'production';

gulp.task('clean-build', () => {
    return del(themePaths.distScripts);
});

gulp.task('webpack', ['clean-build'], (cb) => {
    const config = {
        debug:   !production,
        devtool: production ? false : 'eval',
        entry: {
            app: "./src/main.js",
            vendor: [
                'jquery',
                'gsap/src/uncompressed/TweenLite.js',
                'gsap/src/uncompressed/plugins/CSSPlugin.js',
                'gsap/src/uncompressed/easing/EasePack.js',
                'starting-blocks/src/router.js',
                'starting-blocks/src/state.js'
            ]
        },
        output: {
            filename: '[name]-[hash].js',
            chunkFilename: '[name]-[chunkhash].js',
            publicPath: 'build/',
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
            alias: {
                TweenLite: "gsap/src/uncompressed/TweenLite.js",
                TweenMax: "gsap/src/uncompressed/TweenMax.js",
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor', // Move dependencies to our main file
                /*children: true, // Look for common dependencies in all children,*/
                minChunks: Infinity, // How many times a dependency must come up before being extracted
            })
        ],
        descriptionFiles: ["package.json"],
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" },
                {
                    test: /\.js$/,
                    exclude: /node_modules(?!\/starting-blocks)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    loaders: ['react-hot', 'babel']
                }
            ]
        }
    };

    if (production) {
        config.plugins.push(new webpack.optimize.DedupePlugin());
        config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle:   true,
            comments: false,
            sourceMap: false,
        }));
        config.plugins.push(new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }));

    }

    return gulp.src(themePaths.entry)
        .pipe(plumber({
            handleError: (err) => {
                cb(err);
            }
        }))
        .pipe(named())
        .pipe(webpackStream(config))
        .pipe(gulp.dest(themePaths.distScripts));
});
