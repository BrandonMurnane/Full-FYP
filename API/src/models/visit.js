'use strict';
import _ from 'lodash';

module.exports = function(sequelize, DataTypes) {
  let models = sequelize.models;

  const Visit = sequelize.define('Visit',{
    startTime:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTime:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    booth: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Usergroup'
    },
    event: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Usergroup'
    }
  },{
      classMethods: {
        associate:function(models) {
          Visit.belongsTo(models.UserGroups,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
          Visit.belongsTo(models.User);
          Visit.belongsTo(models.Booth, { foreignKey: 'booth',  onDelete: 'CASCADE'  });
          Visit.belongsTo(models.Events, { foreignKey: 'event' });
        }
      }
    })

  return Visit;
}