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
      field: 'is_checked'
    },
    companyId: {
      type: DataTypes.INTEGER,
      field: 'company_id'
    },
    requirementId: {
      type: DataTypes.INTEGER,
      field: 'requirement_id'
    }
  }, {
    sequelize,
    modelName: 'RequirementCheck',
    tableName: 'requirement_checks',
    underscored: true,
    timestamps: false // 👈 porque en la tabla no hay createdAt/updatedAt
  });

  return RequirementCheck;
};
