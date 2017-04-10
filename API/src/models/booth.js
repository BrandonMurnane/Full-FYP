'use strict';
import _ from 'lodash';

module.exports = function(sequelize, DataTypes) {
  let models = sequelize.models;

  const Booth = sequelize.define('Booth',{
    key:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(4096),
      validate: {
        isUrl: true
      },
      comment: 'Optional thumbnail image.'
    },
    owner:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{
      classMethods: {
        associate:function(models) {
          Booth.belongsToMany(models.Category, { through: 'BoothCategory' });

          Booth.addScope('defaultScope',
          {
            attributes: [
              'key',
              'description',
              'owner',
            ],
            include: [
              { model: models.Category }
            ]
          },
          { override: true }
        );
        },
        create: function(value, options) {
          let booth;
          return this.constructor.prototype.create.apply(this, [value, options])
          .then((createdBooth) => {
            booth = createdBooth;

            return Promise.all([
              _.isUndefined(value.categoryKeys) ? null : booth.setCategories(value.categoryKeys),
            ]);
          })
          .then(() => {
            return booth.reload();
          });
        }
      },
      instanceMethods: {
      // Override toJSON method, include instanceKeys and serviceKeys instead of objects
      toJSON: function() {
        const boothValue = {
          key: this.key,
          description: this.description,
          owner: this.owner
        };

        if (this.Categories) boothValue.categoryKeys = this.Categories.map((category) => category.key);

        return boothValue;
      }
    }
    });

  sequelize.define('BoothCategory',{});
  return Booth;
}