'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RequirementCategory extends Model {
    static associate(models) {
      // 👉 Por ahora no hay relaciones,
      // pero acá podrías definir belongsToMany o hasMany si luego otra tabla depende de RequirementCategory
    }
  }

  RequirementCategory.init({
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RequirementCategory',
    tableName: 'requirement_categories',
    underscored: true,
    timestamps: false // 👈 tu tabla no tiene createdAt/updatedAt
  });

  return RequirementCategory;
};
