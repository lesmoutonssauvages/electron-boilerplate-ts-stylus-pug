const path = require('path')

module.exports = {
  publicPath: './'
  , outputDir: 'build'
  , css: {
    loaderOptions: {
      sass: {
        // additionalData: ''
      }
    }
  }
  , chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src/renderer'))
    config.module.rules.delete('images')
    config.module.rule('images')
      .test(/\.(png|jpg|gif|glb|gltf)$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[ext]'
      })
  }
  , pages: {
    index: {
      entry: 'src/renderer/index.ts'
      , title: 'Index'
      , template: 'public/index.html'
      , filename: 'index.html'
    }
  }
}
