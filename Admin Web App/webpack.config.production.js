var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'FYP Admin',
      favicon: 'public/icons/favicon.ico'
    })
  ]
});
