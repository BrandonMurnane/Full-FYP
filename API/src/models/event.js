'use strict';
import _ from 'lodash';

module.exports = function(sequelize, DataTypes) {
  let models = sequelize.models;

  const Event = sequelize.define('Events',{
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
    speaker:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{
      classMethods: {
        associate:function(models) {
        Event.belongsToMany(models.Category, { through: 'EventCategory' });
        Event.addScope('defaultScope',
          {
            attributes: [
              'key',
              'description',
              'speaker'
            ],
            include: [
              { model: models.Category }
            ]
          },
          { override: true }
        );
        },
        create: function(value, options) {
          let event;
          return this.constructor.prototype.create.apply(this, [value, options])
          .then((createdBooth) => {
            event = createdBooth;

            return Promise.all([
              _.isUndefined(value.categoryKeys) ? null : event.setCategories(value.categoryKeys),
            ]);
          })
          .then(() => {
            return event.reload();
          });
        }
      },
      instanceMethods: {
      // Override toJSON method, include instanceKeys and serviceKeys instead of objects
      toJSON: function() {
        const eventValue = {
          key: this.key,
          description: this.description,
          speaker: this.speaker
        };

        if (this.Categories) eventValue.categoryKeys = this.Categories.map((category) => category.key);

        return eventValue;
      }
    }
    });

  sequelize.define('EventCategory',{});
  return Event;
}