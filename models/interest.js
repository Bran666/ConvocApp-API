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
    underscored: true,
    timestamps: false, // 👈 porque en la tabla no hay created_at ni updated_at
    tableName: 'interests',
    underscored: true,  // Sequelize usará created_at / updated_at
    timestamps: true    // activa created_at y updated_at
  });

  return Interest;
};
