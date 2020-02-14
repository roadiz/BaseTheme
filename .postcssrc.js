module.exports = {
    sourceMap: true,
    plugins: {
        'postcss-custom-selectors': {},
        'postcss-custom-media': {},
        'postcss-selector-matches': {},
        'postcss-custom-properties': {},
        'postcss-calc': {
            precision: 5
        },
        'postcss-reporter': {
            clearAllMessages: true
        },
        'postcss-inline-svg': {}
    }
}
