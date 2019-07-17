const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './frontend/src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: './frontend/dist'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './frontend/public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}