'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    static associate(models) {
      // 🔹 Aquí puedes definir asociaciones si más adelante las necesitas
      // Ejemplo:
      // Interest.hasMany(models.UserInterest, { foreignKey: 'interestId' });
    }
  }

  Interest.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Interest',
      tableName: 'Interests',
      timestamps: true, 
      createdAt: 'createdAt',
      updatedAt: 'updatedAt' 
    }
  );

  return Interest;
};
