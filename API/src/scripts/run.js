#!/usr/bin/env node
const Umzug = require('umzug');
const models = require('../models');
const app = require('../server');

// migration engine
// configuration matches sequelize-cli's config
// https://github.com/sequelize/cli/blob/master/lib/tasks/db.js#L348
const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: models.sequelize,
    tableName: 'SequelizeMeta'
  }
});

app.set('port', process.env.PORT || 5000);

// If force is true, each DAO will do DROP TABLE IF EXISTS ...,
// before it tries to create its own table
const syncOptions = {
  logging: console.log,
  force: false
};


// find all previous migrations
umzug.executed()
.then(() => {
  return models.sequelize.sync(syncOptions);
})
.then(() => {
  const server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
  });
})
.catch((error) => {
  console.log('Start up failed', error);
});
