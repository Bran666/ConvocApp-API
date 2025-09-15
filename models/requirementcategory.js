'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RequirementCategory extends Model {
    static associate(models) {
      // Si luego quieres relacionar con RequirementGroup
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
    },
    created_at: {   // 👈 definidos porque tu migración los creó
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'RequirementCategory',

    tableName: 'RequirementCategories',
    underscored: true,
    timestamps: false, // 👈 tu tabla no tiene createdAt/updatedAt
    tableName: 'RequirementCategories',
    underscored: true,  // 👈 Sequelize traduce createdAt → created_at
    timestamps: true    // 👈 Sequelize manejará created_at y updated_at

  });

  return RequirementCategory;
};
