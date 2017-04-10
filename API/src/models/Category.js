'use strict';
import _ from 'lodash';

module.exports = function(sequelize, DataTypes) {
  let models = sequelize.models;

  const Category = sequelize.define('Category',{
    key:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categoryKeys:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    }
  },{
      classMethods: {
        associate:function(models) {
          Category.belongsToMany(models.Booth, { through: 'BoothCategory' });
          Category.belongsToMany(models.Events, { through: 'EventCategory' });
          Category.belongsToMany(models.User, { through: 'UserCategory' });
          Category.belongsToMany(models.Category, { as: 'related' ,foreignKey:' categoryKeys' , through: 'RelatedCategories' }, );
        }
      }
    })

  return Category;
}