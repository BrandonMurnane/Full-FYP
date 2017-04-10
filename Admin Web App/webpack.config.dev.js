var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('./webpack.config.js')

module.exports = merge(config, {
  entry: {
    app: [ "webpack-dev-server/client?http://0.0.0.0:8080", "webpack/hot/dev-server" ]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: config.output.path,
    historyApiFallback: true,
    hot: true,
    progress: true,
    stats: { colors: true },
    colors: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
