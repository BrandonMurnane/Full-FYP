const express = require('express');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const isDevelopment = (process.env.NODE_ENV !== 'production');
const staticPath = path.join(__dirname, 'public');
const config = require('./webpack.config.dev');


if (isDevelopment) {
  config.devServer.setup = (app) => {
  };

  const webpackServer = new WebpackDevServer(webpack(config), config.devServer);

  webpackServer.listen(8080, '0.0.0.0', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Starting webpack server');
  });
} else {
  const app = express();

  // mount static assets
  app.use(express.static(staticPath));

  // all other paths resolve to SPA js file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });

  app.listen(process.env.PORT || 8080, function (err) {
    if (err) { console.log(err) };
    console.log('Listening at ' + (process.env.PORT || 8080));
  });
}
