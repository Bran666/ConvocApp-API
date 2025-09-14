'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TargetAudience extends Model {
    static associate(models) {
      // Si en el futuro hay relaciones, se definen aquí
    }
  }

  TargetAudience.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TargetAudience',
    tableName: 'TargetAudiences',
    underscored: true,
    timestamps: false // 👈 importante
  });

  return TargetAudience;
};
