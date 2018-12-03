import getConfig from './webpack/config'
import getWebpackConfig from './webpack/build'

module.exports = getWebpackConfig(getConfig())
