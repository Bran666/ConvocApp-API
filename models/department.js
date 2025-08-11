'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.City, { 
        foreignKey: 'departmentId',
        as: 'cities'
      });
    }
  }

  Department.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // 🔹 Esto hace que use el IDENTITY de Postgres
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'departments',
    timestamps: false
  });

  return Department;
};
