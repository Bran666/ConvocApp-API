'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Linea extends Model {
    static associate(models) {
      // define association here
    }
  }

  Linea.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Linea',
    freezeTableName: true, 
    timestamps: true,   
  });

  return Linea;
};
