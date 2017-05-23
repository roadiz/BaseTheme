import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import debug from 'debug'

const dbg = debug('Roadiz-front:webpack-config:base  ')
dbg.color = debug.colors[3]

const getWebpackConfigBase = (config) => {

    const paths = config.utils_paths

    dbg('⚙  Exporting default webpack configuration.')

    return {
        cache: true,
        stats: config.stats,
        devtool: config.devtool,
        devServer: {
            lazy: !config.refreshOnChange,
            stats: config.stats,
            port: config.port,
            publicPath: config.public_path,
            host: config.address,
            watchOptions: {
                poll: config.watchInterval,
                ignored: /node_modules/
            }
        },
        name: 'client',
        target: 'web',
        entry: {
            app: paths.client('src/main.js'),
            vendor: config.js_vendors
        },
        output: {
            path: paths.dist(),
            filename: config.assets_name_js,
            chunkFilename: '[name].[chunkhash].js',
            publicPath: config.public_path
        },
        module: {
            loaders: [{
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: [/node_modules/]
            }, {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }, {
                test: /\.less?$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }],
                })
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: config.limit_image_size,
                    name: config.assets_name_img
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: config.assets_name_font
                }
            }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: config.assets_name_css,
                allChunks: true
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: (module) => {
                    return module.context && module.context.indexOf('node_modules') !== -1
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity
            }),
            new HtmlWebpackPlugin({
                filename: config.utils_paths.views('partials/css-inject.html.twig'),
                template: config.utils_paths.views('partials/css-inject-src.html.twig'),
                cache: true,
                inject: false,
                // datas
                env: config.env
            }),
            new HtmlWebpackPlugin({
                filename: config.utils_paths.views('partials/js-inject.html.twig'),
                template: config.utils_paths.views('partials/js-inject-src.html.twig'),
                cache: true,
                inject: false,
                // datas
                env: config.env
            })
        ],
        resolve: {
            extensions: ['.js']
        },
        externals: config.externals
    }
}

export default getWebpackConfigBase
