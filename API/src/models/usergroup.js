'use strict';
import _ from 'lodash';

module.exports = function(sequelize, DataTypes) {
  let models = sequelize.models;

  const UserGroup = sequelize.define('UserGroups',{
    key:{
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey:true
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },{
  })


  return UserGroup;
}