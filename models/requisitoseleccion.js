'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequisitoSeleccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RequisitoSeleccion.init({
    nombre: DataTypes.STRING,
    idTipo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RequisitoSeleccion',
     tableName: 'requisitoSeleccion',
  });
  return RequisitoSeleccion;
};