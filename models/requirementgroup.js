'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RequirementGroup extends Model {
    static associate(models) {
      RequirementGroup.belongsTo(models.RequirementCategory, { 
        foreignKey: 'categoryId',
        as: 'requirementCategory'
      });
      RequirementGroup.hasMany(models.Requirement, { 
        foreignKey: 'groupId',
        as: 'requirements'
      });
    }
  }

  RequirementGroup.init({
    name: DataTypes.STRING(100),
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
    }
  }, {
    sequelize,
    modelName: 'RequirementGroup',
    tableName: 'requirement_groups', // 👈 nombre real en la BD
    underscored: true, // 👈 respeta snake_case en columnas
    timestamps: false // 👈 no hay createdAt/updatedAt
  });

  return RequirementGroup;
};
