import debug from 'debug'
import path from 'path'
import ip from 'ip'

const dbg = debug('Roadiz-front:config:base  ')
dbg.color = debug.colors[2]

const getConfig = () => {
    const config = {
        env: process.env.NODE_ENV || 'development',
        address: ip.address(),
        port: '8090',
        devtool: 'cheap-module-eval-source-map',

        // ----------------------------------
        // Project Structure
        // ----------------------------------
        path_base: path.resolve(__dirname, '..', '..'),
        dir_client: 'app',
        dir_dist: 'static',
        dir_views: 'Resources/views',

        // ----------------------------------
        // Stats
        // ----------------------------------
        stats: {
            chunks: false,
            chunkModules: false,
            colors: true,
            children: false,
            version: false,
            reasons: false
        },

        // ----------------------------------
        // Watch options
        // ----------------------------------
        refreshOnChange: process.env.REFRESH_ON_CHANGE === 'true',
        watchInterval: 1000, // Poll interval in ms

        // ----------------------------------
        // Inputs
        // ----------------------------------
        js_vendors: [
            'starting-blocks/bundle.js',
            'loglevel/dist/loglevel.js',
            'ismobilejs/isMobile.js'
        ],

        // ----------------------------------
        // Outputs
        // ----------------------------------
        assets_name_js: 'js/[name].js',
        assets_name_img: 'img/[name].[ext]',
        assets_name_css: 'css/[name].css',
        assets_name_font: 'fonts/[name].[ext]',

        // ----------------------------------
        // SVG Structure
        // ----------------------------------
        svg_paths: 'svg/*.svg',
        svg_sprite_name: 'sprite.svg.twig',
        svg_sprite_path: 'svg',

        // ----------------------------------
        // Images
        // ----------------------------------
        limit_image_size: 8000, // 8kb

        // ----------------------------------
        // Externals
        // ----------------------------------
        externals: {
            TweenLite: 'TweenLite',
            TweenMax: 'TweenMax',
            Expo: 'Expo',
            CSSPlugin: 'CSSPlugin',
            jQuery: 'jQuery',
            jquery: 'jQuery',
            $: '$'
        }
    }

    config.public_path = ''

// ------------------------------------
// Utilities
// ------------------------------------
    const resolve = path.resolve
    const base = (...args) =>
        Reflect.apply(resolve, null, [config.path_base, ...args])

    config.utils_paths = {
        base: base,
        client: base.bind(null, config.dir_client),
        dist: base.bind(null, config.dir_dist),
        views: base.bind(null, config.dir_views)
    }

    dbg('⚙  Exporting default configuration.')
    return config
}

export default getConfig
