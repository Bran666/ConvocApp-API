'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class convocatorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  convocatorias.init({
    idConvocatorias: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    recursos: DataTypes.TEXT,
    linkConvocatoria: DataTypes.STRING,
    fechaApertura: DataTypes.STRING,
    fechaCierre: DataTypes.STRING,
    nombrePagina: DataTypes.STRING,
    pagina: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'convocatorias',
  });
  return convocatorias;
};