import webpack from 'webpack';

const production = process.env.NODE_ENV === 'production';
const config = {
    debug: !production,
    devtool: production ? false : 'eval-source-map',
    entry: {
        app: "./src/main.js",
        vendor: [
            'jquery',
            'gsap/TweenMax.js',
            'starting-blocks/bundle.js',
            'loglevel/dist/loglevel.js',
            'ismobilejs/isMobile.js'
        ]
    },
    output: {
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'build/',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // Move dependencies to our main file
            /*children: true, // Look for common dependencies in all children,*/
            minChunks: Infinity, // How many times a dependency must come up before being extracted
        })
    ],
    descriptionFiles: ["package.json"],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            }
        ]
    }
};

if (production) {
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle:   true,
        comments: false,
        sourceMap: false,
    }));
    config.plugins.push(new webpack.DefinePlugin({
        __SERVER__:      !production,
        __DEVELOPMENT__: !production,
        __DEVTOOLS__:    !production,
        'process.env':   {
            BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }));
}

export default config;
