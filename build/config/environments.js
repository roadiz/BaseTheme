export default {
    development: (config) => ({}),

    production: (config) => ({
        devtool: false,
        publicPath: '/',
        assetsNameJs: 'js/[name].[hash].js',
        assetsNameImg: 'img/[name].[chunkhash].[ext]',
        assetsNameCss: 'css/[name].[chunkhash].css',
        assetsNameFont: 'fonts/[name].[hash].[ext]',
    })
}
