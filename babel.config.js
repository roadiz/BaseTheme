module.exports = {
    presets: [
        ['@vue/babel-preset-app', {
            useBuiltIns: 'entry',
            loose: true,
            corejs: false,
            polyfills: []
        }]
    ]
}
