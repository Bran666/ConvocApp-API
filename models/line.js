'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Line extends Model {
    static associate(models) {
      Line.hasMany(models.Call, {
        foreignKey: 'lineId',
        as: 'calls'
      });
    }
  }
  
  Line.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Line',
    tableName: 'Lines',
    underscored: true,
    timestamps: false
  });

  return Line;
};
