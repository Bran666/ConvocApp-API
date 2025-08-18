'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    static associate(models) {
      // 👇 Aquí definimos relaciones si después otras tablas dependen de institutions
      // Ejemplo: Institution.hasMany(models.User, { foreignKey: 'institutionId', as: 'users' });
    }
  }

  Institution.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Institution',
    tableName: 'institutions',
    underscored: true,
    timestamps: false
  });

  return Institution;
};
