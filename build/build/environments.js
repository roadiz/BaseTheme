import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import postcssFixes from 'postcss-fixes'
import postcssFilterGradient from 'postcss-filter-gradient'
import postcssReduceTransform from 'postcss-reduce-transforms'
import cssMqpacker from 'css-mqpacker'
import Harddisk from 'html-webpack-harddisk-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import debug from 'debug'

const dbg = debug('Roadiz-front:webpack-config:environments  ')
dbg.color = debug.colors[5]

export default {
    development: (base, config) => ({
        watch: true,
        devServer: {
            stats: config.stats,
            port: config.port,
            publicPath: config.public_path,
            host: config.address,
            watchOptions: {
                aggregateTimeout: 50,
                ignored: /node_modules/
            }
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
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
            new Harddisk()
        ]
    }),

    production: (base, config) => {
        dbg('🗑  Cleaning assets folder')
        dbg('👽  Using UglifyJs')
        dbg('🎨  Using PostCss')

        return {
            module: {
                loaders: [{
                    test: /\.scss?$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: false
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
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
                                        sourcemap: false
                                    })
                                ]
                            }
                        }, {
                            loader: 'resolve-url-loader'
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }]
                    })
                }]
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    beautify: false,
                    mangle: {
                        screw_ie8: true,
                        keep_fnames: true
                    },
                    compress: {
                        screw_ie8: true,
                        warnings: false
                    },
                    comments: false
                }),
                new webpack.HashedModuleIdsPlugin(),
                new CleanWebpackPlugin(['css', 'img', 'js', 'fonts', 'vendors'], {
                    root: config.utils_paths.dist(),
                    verbose: false
                }),
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
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    minChunks: (module) => {
                        return module.context && module.context.indexOf('node_modules') !== -1
                    }
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'manifest',
                    minChunks: Infinity
                })
            ]
        }
    }
}
