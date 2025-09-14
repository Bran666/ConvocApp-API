'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      // City pertenece a Department
      City.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department'
      });
    }
  }

  City.init({
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      field: 'department_id'  
    }
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'Cities',
    underscored: true,
    timestamps: false
  });

  return City;
};
