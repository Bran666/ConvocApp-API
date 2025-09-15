'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.City, { 
        foreignKey: 'departmentId',
        as: 'Cities'
      });
    }
  }

  Department.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'Departments',  // ✅ mayúscula
    timestamps: true           // ✅ porque usaste createdAt/updatedAt en la migración
  });

  return Department;
};
