'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    static associate(models) {
      Requirement.belongsTo(models.Institution, {
        foreignKey: 'institutionId',
        as: 'institution'
      });
      Requirement.belongsTo(models.RequirementGroup, {
        foreignKey: 'groupId',
        as: 'requirementGroup'
      });
    }
  }

  Requirement.init({
    name: DataTypes.STRING(200),
    notes: DataTypes.TEXT,
    institutionId: {
      type: DataTypes.INTEGER,
      field: 'institutionId'
    },
    groupId: {
      type: DataTypes.INTEGER,
      field: 'groupId'
    }
  }, {
    sequelize,
    modelName: 'Requirement',
    tableName: 'Requirements',
    timestamps: true
  });

  return Requirement;
};
