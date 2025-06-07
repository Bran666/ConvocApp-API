'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate(models) {
      // define association here si tienes
    }
  }

  Empresa.init({
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
    modelName: 'Empresa',       // ← con mayúscula
    tableName: 'empresas',      // ← forzar nombre correcto de tabla
    timestamps: false           // ← si no usas createdAt/updatedAt
  });

  return Empresa;
};
