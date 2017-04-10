#!/usr/bin/env node
'use strict';

var Umzug = require('umzug');
var models = require('../models');
var app = require('../server');

// migration engine
// configuration matches sequelize-cli's config
// https://github.com/sequelize/cli/blob/master/lib/tasks/db.js#L348
var umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: models.sequelize,
    tableName: 'SequelizeMeta'
  }
});

app.set('port', process.env.PORT || 5000);

// If force is true, each DAO will do DROP TABLE IF EXISTS ...,
// before it tries to create its own table
var syncOptions = {
  logging: console.log,
  force: false
};

// find all previous migrations
umzug.executed().then(function () {
  return models.sequelize.sync(syncOptions);
}).then(function () {
  var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
  });
}).catch(function (error) {
  console.log('Start up failed', error);
});