const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './frontend/src/app.tsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './frontend/dist'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './frontend/public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'frontend/config/tsconfig.json',
        },
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
}