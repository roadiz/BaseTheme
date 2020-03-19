const path = require('path')

module.exports = {
    extensions: ['.js', '.json', '.vue', '.ts', '.tsx'],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'app')
        }
    }
}
