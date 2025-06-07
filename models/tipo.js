'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tipo.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // 🔑 Esto es lo que falta
      autoIncrement: true, // Esto es opcional si tu campo id es autoincremental
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Tipo',
    tableName: 'tipo', // nombre exacto de la tabla en tu base de datos
    timestamps: false, // Si no usas createdAt y updatedAt
  });

  return Tipo;
};