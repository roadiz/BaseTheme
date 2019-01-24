export default {
    development: (config) => {
        let override = {}
        if (config.refreshOnChange) {
            override.public_path = `http://${config.address}:${config.port}/`
        }

        return override
    },

    production: (config) => ({
        devtool: false,
        assets_name_js: 'js/[name].[chunkhash].js',
        assets_chunkfilename: 'js/[name].[chunkhash].js',
        assets_name_img: 'img/[name].[ext]',
        assets_name_css: 'css/[name].[chunkhash].css',
        assets_name_font: 'fonts/[name].[hash].[ext]'
    })
}
