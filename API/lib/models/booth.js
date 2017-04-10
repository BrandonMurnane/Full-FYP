'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var models = sequelize.models;

  var Booth = sequelize.define('Booth', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING(4096),
      validate: {
        isUrl: true
      },
      comment: 'Optional thumbnail image.'
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Booth.belongsToMany(models.Category, { through: 'BoothCategory' });

        Booth.addScope('defaultScope', {
          attributes: ['key', 'description', 'owner'],
          include: [{ model: models.Category }]
        }, { override: true });
      },
      create: function create(value, options) {
        var booth = void 0;
        return this.constructor.prototype.create.apply(this, [value, options]).then(function (createdBooth) {
          booth = createdBooth;

          return Promise.all([_lodash2.default.isUndefined(value.categoryKeys) ? null : booth.setCategories(value.categoryKeys)]);
        }).then(function () {
          return booth.reload();
        });
      }
    },
    instanceMethods: {
      // Override toJSON method, include instanceKeys and serviceKeys instead of objects
      toJSON: function toJSON() {
        var boothValue = {
          key: this.key,
          description: this.description,
          owner: this.owner
        };

        if (this.Categories) boothValue.categoryKeys = this.Categories.map(function (category) {
          return category.key;
        });

        return boothValue;
      }
    }
  });

  sequelize.define('BoothCategory', {});
  return Booth;
};