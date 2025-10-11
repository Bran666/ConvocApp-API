'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RequirementCategory extends Model {
    static associate(models) {
      RequirementCategory.hasMany(models.RequirementGroup, {
        foreignKey: 'categoryId',
        as: 'groups'
      });
    }
  }

  RequirementCategory.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RequirementCategory',
    tableName: 'RequirementCategories',
    timestamps: true // Esto le dice a Sequelize que espere y gestione `createdAt` y `updatedAt`
  });

  return RequirementCategory;
};
