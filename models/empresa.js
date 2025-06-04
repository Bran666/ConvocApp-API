'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  empresa.init({
    nombre: DataTypes.STRING,
    nit: DataTypes.STRING,
    razonSocial: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    paginaWeb: DataTypes.STRING,
    numEmpleados: DataTypes.INTEGER,
    sectorEconomico: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    tiempoExistencia: DataTypes.INTEGER,
    documentoLegal: DataTypes.STRING,
    nombreLegal: DataTypes.STRING,
    apellidoLegal: DataTypes.STRING,
    telefonoFijo: DataTypes.STRING,
    celularLegal: DataTypes.STRING,
    email: DataTypes.STRING,
    cargoLegal: DataTypes.STRING,
    fkIdCiudad: DataTypes.INTEGER,
    fkIdUsuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'empresa',
  });
  return empresa;
};