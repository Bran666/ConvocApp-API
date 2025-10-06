'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    static associate(models) {
      // Por ahora, sin relaciones directas
    }
  }

  Interest.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Interest',
    tableName: 'Interests',
    timestamps: true // Sequelize manejará createdAt y updatedAt
  });

  return Interest;
};
