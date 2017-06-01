import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import debug from 'debug'

const dbg = debug('Roadiz-front:webpack-config:base  ')
dbg.color = debug.colors[3]

const getWebpackConfigBase = (config) => {
    const paths = config.utils_paths

    dbg('⚙  Exporting default webpack configuration.')

    let webpackConfig = {
        cache: true,
        stats: config.stats,
        devtool: config.devtool,
        name: 'client',
        target: 'web',
        context: paths.dist(),
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
                test: /\.scss?$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
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
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: config.limit_image_size,
                    publicPath: '../',
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
            new webpack.NoEmitOnErrorsPlugin()
        ],
        resolve: {
            extensions: ['.js']
        },
        externals: config.externals
    }

    if (config.refreshOnChange) {
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return webpackConfig
}

export default getWebpackConfigBase
