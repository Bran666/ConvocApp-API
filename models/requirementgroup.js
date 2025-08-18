'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RequirementGroup extends Model {
    static associate(models) {
      // Relación con RequirementCategory
      RequirementGroup.belongsTo(models.RequirementCategory, {
        foreignKey: 'categoryId',
        as: 'category'
      });

      // Si luego tienes relación con Requirements:
      RequirementGroup.hasMany(models.Requirement, {
        foreignKey: 'groupId',
        as: 'requirements'
      });
    }
  }

  RequirementGroup.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
    }
  }, {
    sequelize,
    modelName: 'RequirementGroup',
    tableName: 'requirement_groups',
    underscored: true,
    timestamps: false // 👈 porque en la tabla no hay createdAt/updatedAt
  });

  return RequirementGroup;
};
