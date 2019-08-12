const Dotenv = require('dotenv-webpack')
const base = require('./webpack.base')

module.exports = {
  mode: 'development',
  ...base,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './frontend/dist',
    historyApiFallback: true,
  },
  plugins: [
    ...base.plugins,
    new Dotenv({
      path: './.env.dev',
    }),
  ],
}