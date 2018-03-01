import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import debug from 'debug'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'

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
            app: paths.client('js/main.js'),
            'vendor': [
                'style-loader/lib/addStyles',
                'css-loader/lib/css-base'
            ]
        },
        output: {
            path: paths.dist(),
            filename: config.assets_name_js,
            chunkFilename: '[name].[chunkhash].js',
            publicPath: config.public_path
        },
        module: {
            rules: [{
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: [/node_modules/, /app\/vendors/]
            }, {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
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
            new webpack.DefinePlugin(config.globals),
            new CleanWebpackPlugin(['css', 'img', 'js', 'fonts', 'vendors', '*.*'], {
                root: config.utils_paths.dist(),
                verbose: false
            }),
            new CopyWebpackPlugin([{
                from: paths.client('img'),
                to: paths.dist('img')
            }, {
                from: paths.client('vendors'),
                to: paths.dist('vendors')
            }]),
            new ExtractTextPlugin({
                filename: config.assets_name_css,
                ignoreOrder: true,
                allChunks: false
            })
        ],
        resolve: {
            extensions: ['.js']
        },
        externals: config.externals
    }

    if (config.refreshOnChange) {
        webpackConfig.plugins.push(new WriteFilePlugin())
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return webpackConfig
}

export default getWebpackConfigBase
