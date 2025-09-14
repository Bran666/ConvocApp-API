'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Aquí defines las asociaciones si las necesitas
      // Ejemplo: Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
    }
  }

  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles',
      underscored: true,
    timestamps: false // 👈 para que no intente manejar created_at / updated_at
  });

  return Role;
};
