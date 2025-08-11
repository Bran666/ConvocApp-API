'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    static associate(models) {
      Institution.hasMany(models.Requirement, {
        foreignKey: 'institutionId',
        as: 'requirements'
      });
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
    tableName: 'institutions', // 👈 usa exactamente el nombre real de la tabla
    timestamps: false // 👈 porque tu tabla no tiene createdAt/updatedAt
  });

  return Institution;
};
