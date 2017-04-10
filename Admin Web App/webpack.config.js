var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var PUBLIC_PATH = path.resolve(ROOT_PATH, 'public');

module.exports = {
  entry: {
    app: [ APP_PATH ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'fyp-admin-web.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.html',
      title: 'FYP Admin',
      favicon: 'public/icons/favicon.ico',
      mobile: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:5000/v1'),
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: [ PUBLIC_PATH, APP_PATH ]
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: [ PUBLIC_PATH, APP_PATH ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
        include: [ PUBLIC_PATH, APP_PATH ]
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: APP_PATH
      }
    ]
  },
  sassLoader: {
    includePaths: [PUBLIC_PATH + '/css']
  }
}

