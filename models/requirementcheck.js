'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RequirementCheck extends Model {
    static associate(models) {
      // Relación con Company
      RequirementCheck.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });

      // Relación con Requirement
      RequirementCheck.belongsTo(models.Requirement, {
        foreignKey: 'requirementId',
        as: 'requirement'
      });

      // Relación con User
      RequirementCheck.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  RequirementCheck.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      field: 'isChecked'
    },
    companyId: {
      type: DataTypes.INTEGER,
      field: 'companyId'
    },
    requirementId: {
      type: DataTypes.INTEGER,
      field: 'requirementId'
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'userId'
    }
  }, {
    sequelize,
    modelName: 'RequirementCheck',
    tableName: 'RequirementChecks',
    timestamps: true
  });

  return RequirementCheck;
};
