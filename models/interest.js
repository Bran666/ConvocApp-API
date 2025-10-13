'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    static associate(models) {
      // Puedes agregar asociaciones aquí si las necesitas
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
    timestamps: true,         // ✅ Sigue usando timestamps
    createdAt: 'created_at',  // ✅ Usa los nombres reales de la BD
    updatedAt: 'updated_at'
  });

  return Interest;
};
