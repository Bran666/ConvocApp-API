'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department'
      });
    }
  }

  City.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    departmentId: {   // 👈 igual que en migración
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'Cities',
    timestamps: true // 👈 porque la migración tiene createdAt/updatedAt
  });

  return City;
};
