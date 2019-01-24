import webpack from 'webpack'
import cssnano from 'cssnano'
import postcssFixes from 'postcss-fixes'
import postcssFilterGradient from 'postcss-filter-gradient'
import postcssReduceTransform from 'postcss-reduce-transforms'
import cssMqpacker from 'css-mqpacker'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackMultiBuildPlugin from '../modules/HtmlWebpackMultiBuildPlugin'
import debug from 'debug'
import WebpackNotifierPlugin from 'webpack-notifier'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const dbg = debug('Roadiz-front:webpack-config:environments  ')
dbg.color = debug.colors[5]

const scssConfigProd = {
    test: /\.s?css?$/,
    use: [{
        loader: MiniCssExtractPlugin.loader
    }, {
        loader: 'css-loader',
        options: {
            modules: false,
            minimize: true,
            filename: '[name].[contenthash].css',
            importLoaders: 3,
            sourceMap: false
        }
    }, {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            plugins: [
                postcssFixes(),
                postcssFilterGradient(),
                postcssReduceTransform(),
                cssMqpacker(),
                cssnano({
                    autoprefixer: {
                        add: true,
                        remove: true,
                        browsers: ['last 2 version', 'ie 11', 'ie 10']
                    },
                    discardComments: {
                        removeAll: true
                    },
                    discardUnused: false,
                    mergeIdents: false,
                    reduceIdents: false,
                    safe: true
                })
            ]
        }
    }, {
        loader: 'resolve-url-loader'
    }, {
        loader: 'sass-loader'
    }]
}

const optimization = {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'all',
                minChunks: 2,
                minSize: 0,
                enforce: true
            }
        }
    }
}

const commonScssDev = [{
    loader: 'css-loader',
    options: {
        modules: false,
        minimize: false,
        filename: '[name].css',
        importLoaders: 2,
        sourceMap: true
    }
}, {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: true
    }
}, {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
}]

let scssConfigDev = {
    test: /\.s?css?$/,
    use: [{
        loader: MiniCssExtractPlugin.loader
    }, ...commonScssDev]
}

if (process.env.REFRESH_ON_CHANGE === 'true') {
    scssConfigDev = {
        test: /\.s?css?$/,
        use: [{
            loader: 'style-loader'
        }, ...commonScssDev]
    }
}

export default {
    modern: (base, config) => {
        const paths = config.utils_paths
        let filename = 'js/modern.[name].js'
        let chunkfilename = 'js/modern.[name].js'

        if (config.env === 'production') {
            filename = 'js/modern.[name].[chunkhash].js'
            chunkfilename = 'js/modern.[name].[chunkhash].js'
        }

        return {
            entry: {
                app: paths.client('js/main.js')
            },
            output: {
                path: paths.dist(),
                filename: filename,
                chunkFilename: chunkfilename,
                publicPath: config.public_path
            },
            module: {
                rules: [{
                    test: /\.js?$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: [
                            [
                                '@babel/preset-env', {
                                    targets: {
                                        esmodules: true
                                    }
                                }
                            ]
                        ]
                    }
                }]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    filename: config.utils_paths.views('partials/js-inject-modern.html.twig'),
                    template: config.utils_paths.views('partials/js-inject-modern-src.html.twig'),
                    cache: false,
                    inject: false,
                    refreshOnChange: config.refreshOnChange
                }),
                new HtmlWebpackPlugin({
                    filename: config.utils_paths.views('partials/css-inject.html.twig'),
                    template: config.utils_paths.views('partials/css-inject-src.html.twig'),
                    cache: false,
                    inject: false,
                    refreshOnChange: config.refreshOnChange
                }),
                new HtmlWebpackMultiBuildPlugin()
            ]
        }
    },

    legacy: (base, config) => {
        const paths = config.utils_paths
        let filename = 'js/legacy.[name].js'
        let chunkfilename = 'js/legacy.[name].js'

        if (config.env === 'production') {
            filename = 'js/legacy.[name].[chunkhash].js'
            chunkfilename = 'js/legacy.[name].[chunkhash].js'
        }

        return {
            entry: {
                app: ['whatwg-fetch', 'es6-promise', 'url-polyfill', paths.client('js/main.js')]
            },
            output: {
                path: paths.dist(),
                filename: filename,
                chunkFilename: chunkfilename,
                publicPath: config.public_path
            },
            plugins: [
                new HtmlWebpackPlugin({
                    filename: config.utils_paths.views('partials/js-inject-legacy.html.twig'),
                    template: config.utils_paths.views('partials/js-inject-legacy-src.html.twig'),
                    cache: false,
                    inject: false,
                    refreshOnChange: config.refreshOnChange
                })
            ]
        }
    },

    development: (base, config) => {
        const devConfig = {
            watch: true,
            mode: 'development',
            cache: true,
            devServer: {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
                },
                inline: true,
                stats: config.stats,
                port: config.port,
                publicPath: config.public_path,
                host: config.address,
                disableHostCheck: true,
                hot: true,
                watchOptions: {
                    aggregateTimeout: 50,
                    ignored: /node_modules/
                }
            },
            plugins: [
                new WebpackNotifierPlugin({ alwaysNotify: true })
            ],
            module: {
                rules: [scssConfigDev]
            },
            optimization: {
                ...optimization
            }
        }

        if (process.env.REFRESH_ON_CHANGE !== 'true') {
            devConfig.devtool = 'source-map'
            devConfig.plugins.push(new MiniCssExtractPlugin({
                filename: config.assets_name_css
            }))
        } else {
            devConfig.devtool = 'eval-source-map'
        }

        return devConfig
    },

    production: (base, config) => {
        dbg('🗑  Cleaning assets folder')
        dbg('👽  Using UglifyJs')
        dbg('🎨  Using PostCss')

        return {
            mode: 'production',
            module: {
                rules: [scssConfigProd]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"production"'
                    }
                }),
                new MiniCssExtractPlugin({
                    filename: config.assets_name_css
                }),
                // Compress extracted CSS. We are using this plugin so that possible
                // duplicated CSS from different components can be deduped.
                new OptimizeCSSPlugin({
                    cssProcessorOptions: {
                        cssProcessor: require('cssnano'),
                        discardComments: { removeAll: true }
                    }
                })
            ],
            optimization: {
                ...optimization
            }
        }
    }
}
