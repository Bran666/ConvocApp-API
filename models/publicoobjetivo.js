'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicoObjetivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PublicoObjetivo.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PublicoObjetivo',
     tableName: 'publicoobjetivo', 
  timestamps: true
  });
  return PublicoObjetivo;
};