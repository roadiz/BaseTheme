import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import debug from 'debug'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'
import HtmlWebpackMultiBuildPlugin from '../modules/HtmlWebpackMultiBuildPlugin'

const dbg = debug('Roadiz-front:webpack-config:base  ')
dbg.color = debug.colors[3]

const getWebpackConfigBase = (config) => {
    const paths = config.utils_paths

    dbg('⚙  Exporting default webpack configuration.')

    let webpackConfig = {
        cache: true,
        stats: config.stats,
        devtool: config.devtool,
        target: 'web',
        context: paths.dist(),
        module: {
            rules: [{
                test: /svg\/.*\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: '../static/svg/sprite.svg',
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
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: config.limit_image_size,
                    publicPath: '../',
                    name: config.assets_name_img
                }
            }, {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                options: {
                    limit: config.limit_image_size,
                    useRelativePath: true,
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
            new webpack.DefinePlugin(config.globals),
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: false,
                cleanOnceBeforeBuildPatterns: ['css', 'img', 'js', 'fonts', 'vendors'],
                verbose: true
            }),
            new CopyWebpackPlugin([{
                from: paths.client('img'),
                to: paths.dist('img')
            }, {
                from: paths.client('vendors'),
                to: paths.dist('vendors')
            }]),
            new SpriteLoaderPlugin({
                plainSprite: true,
                spriteAttrs: {
                    id: 'svg-sprite'
                }
            }),
            new webpack.HashedModuleIdsPlugin(),
            new HtmlWebpackMultiBuildPlugin()
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
