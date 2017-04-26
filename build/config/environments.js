export default {
    development: (config) => ({}),

    production: (config) => ({
        devtool: false,
        public_path: '/',
        assets_name_js: 'js/[name].[hash].js',
        assets_name_img: 'img/[name].[hash].[ext]',
        assets_name_css: 'css/[name].[chunkhash].css',
        assets_name_font: 'fonts/[name].[hash].[ext]',
    })
}
