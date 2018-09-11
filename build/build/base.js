import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import debug from 'debug'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin'

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
            app: [paths.client('js/main.js'), paths.client('scss/style.scss')]
        },
        output: {
            path: paths.dist(),
            filename: config.assets_name_js,
            chunkFilename: config.assets_chunkfilename,
            publicPath: config.public_path
        },
        module: {
            rules: [{
                test: /svg\/.*\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: '../Resources/views/svg/sprite.svg.twig',
                            runtimeCompat: true,
                            symbolId: 'icon-[name]'
                        }
                    },
                    'svg-transform-loader',
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeTitle: true },
                                { convertColors: { shorthex: false } },
                                { convertPathData: false }
                            ]
                        }
                    }
                ]
            }, {
                test: /js\/.*\.js$/,
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
                test: /fonts\/.*\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: config.assets_name_font
                }
            }]
        },
        plugins: [
            new CleanTerminalPlugin(),
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
            }),
            new SpriteLoaderPlugin({
                plainSprite: true,
                spriteAttrs: {
                    id: 'svg-sprite'
                }
            })
        ],
        resolve: {
            extensions: ['.js']
        },
        externals: config.externals
    }

    if (config.dynamicImportStyle) {
        webpackConfig.entry.vendor = [
            'style-loader/lib/addStyles',
            'css-loader/lib/css-base'
        ]
    }

    if (config.refreshOnChange) {
        webpackConfig.plugins.push(new WriteFilePlugin())
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    if (config.bundleAnalyzerReport) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    }

    return webpackConfig
}

export default getWebpackConfigBase
