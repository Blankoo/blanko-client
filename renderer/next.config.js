module.exports = {
  webpack(config) {
		const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
    config.target = 'electron-renderer'
		config.plugins.push(new UglifyJSPlugin())
    return config
  },
  exportPathMap() {
    // Let Next.js know where to find the entry page
    // when it's exporting the static bundle for the use
    // in the production version of your app
    return {
      '/start': { page: '/start' }
    }
  }
}
