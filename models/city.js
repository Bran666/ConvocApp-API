'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department' // alias que usamos en include
      });
    }
  }
City.init({
  name: DataTypes.STRING,
  departmentId: {
    type: DataTypes.INTEGER,
    field: 'department_id'
  }
}, {
  sequelize,
  modelName: 'City',
  tableName: 'cities',
  underscored: true,
  timestamps: false // 👈 importante
});
  return City;
};
