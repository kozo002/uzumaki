const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './frontend/src/app.tsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './frontend/public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        // loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
          }
        }]
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@common': path.resolve(__dirname, '../../common'),
    }
  },
}