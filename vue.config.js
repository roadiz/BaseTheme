const path = require('path')
const WebpackNotifierPlugin = require('webpack-notifier')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
// Use your Roadiz App .env file
const envFile = require('dotenv').config({ path: '../../.env' })

module.exports = {
    productionSourceMap: false,
    runtimeCompiler: true,
    publicPath: '/themes/BaseTheme/static/',
    outputDir: 'static',
    crossorigin: 'use-credentials',
    transpileDependencies: [
        'swiper',
        'dom7',
        'ssr-window'
    ],
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        watchOptions: {
            poll: true
        },
        proxy: {
            '^': {
                target: 'http://0.0.0.0:' + (envFile.parsed ? envFile.parsed.APP_PORT : '80'), // project url when launch with make dev-server
                changeOrigin: true
            }
        }
    },
    css: {
        sourceMap: true
    },
    configureWebpack: config => {
        config.plugins.push(
            new SpriteLoaderPlugin({
                plainSprite: true,
                spriteAttrs: {
                    id: 'svg-sprite'
                }
            })
        )
        config.plugins.push(
            new WebpackNotifierPlugin({
                title: 'BaseTheme',
                alwaysNotify: true
            })
        )

        config.module.rules.push({
            test: /svg\/.*\.svg$/,
            use: [{
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
            }]
        })
    },
    chainWebpack: config => {
        if (config.plugins.has('prefetch')) {
            config.plugin('prefetch').tap(options => {
                options[0].fileBlacklist = options[0].fileBlacklist || []
                options[0].fileBlacklist.push(/async-(.)+?/)
                return options
            })
        }

        config
            .plugin('html')
            .tap(args => {
                args[0].filename = '../Resources/views/base.html.twig'
                args[0].template = 'Resources/views/base_src.html.twig'
                return args
            })

        config.resolve
            .alias
            .set('@', path.resolve(__dirname, 'app'))
            .set('~', path.resolve(__dirname, 'app'))
            .end()

        const svgRule = config.module.rule('svg')
        // clear all existing loaders.
        // if you don't do this, the loader below will be appended to
        // existing loaders of the rule.
        svgRule.uses.clear()
    }
}
