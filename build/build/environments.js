import webpack from 'webpack'
import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import postcssFixes from 'postcss-fixes'
import postcssFilterGradient from 'postcss-filter-gradient'
import postcssReduceTransform from 'postcss-reduce-transforms'
import cssMqpacker from 'css-mqpacker'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin'
import Harddisk from '../plugins/harddisk-plugins'
import debug from 'debug'
import WebpackNotifierPlugin from 'webpack-notifier'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'

const dbg = debug('Roadiz-front:webpack-config:environments  ')
dbg.color = debug.colors[5]

const scssConfig = {
    test: /\.s?css?$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
                modules: false,
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
                        safe: true,
                        sourceMap: true
                    })
                ]
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
    })
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

export default {
    development: (base, config) => ({
        watch: true,
        mode: 'development',
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            },
            stats: config.stats,
            port: config.port,
            publicPath: config.public_path,
            host: config.address,
            hot: true,
            watchOptions: {
                aggregateTimeout: 50,
                ignored: /node_modules/
            }
        },
        module: {
            rules: [scssConfig]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: config.utils_paths.views('partials/css-inject.html.twig'),
                template: config.utils_paths.views('partials/css-inject-src.html.twig'),
                cache: true,
                inject: false,
                alwaysWriteToDisk: true,
                refreshOnChange: config.refreshOnChange
            }),
            new HtmlWebpackPlugin({
                filename: config.utils_paths.views('partials/js-inject.html.twig'),
                template: config.utils_paths.views('partials/js-inject-src.html.twig'),
                cache: true,
                inject: false,
                alwaysWriteToDisk: true,
                refreshOnChange: config.refreshOnChange
            }),
            new Harddisk(),
            new WebpackNotifierPlugin({alwaysNotify: true})
        ],
        optimization: {
            ...optimization
        }
    }),

    production: (base, config) => {
        dbg('🗑  Cleaning assets folder')
        dbg('👽  Using UglifyJs')
        dbg('🎨  Using PostCss')

        return {
            mode: 'production',
            module: {
                rules: [scssConfig]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"production"'
                    }
                }),
                // Compress extracted CSS. We are using this plugin so that possible
                // duplicated CSS from different components can be deduped.
                new OptimizeCSSPlugin({
                    cssProcessorOptions: {
                        safe: true,
                        cssProcessor: require('cssnano'),
                        discardComments: { removeAll: true }
                    }
                }),
                new webpack.HashedModuleIdsPlugin(),
                new HtmlWebpackPlugin({
                    filename: config.utils_paths.views('partials/css-inject.html.twig'),
                    template: config.utils_paths.views('partials/css-inject-src.html.twig'),
                    cache: true,
                    inject: false
                }),
                new HtmlWebpackPlugin({
                    filename: config.utils_paths.views('partials/js-inject.html.twig'),
                    template: config.utils_paths.views('partials/js-inject-src.html.twig'),
                    cache: true,
                    inject: false
                })
            ],
            optimization: {
                ...optimization,
                minimize: true,
                occurrenceOrder: true,
                minimizer: [
                    new UglifyJsWebpackPlugin({
                        parallel: true,
                        uglifyOptions: {
                            output: {
                                comments: false,
                                beautify: false
                            }
                        }
                    })
                ]
            }
        }
    }
}
