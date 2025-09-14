'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      User.hasMany(models.Favorite, {
        foreignKey: 'userId',
        as: 'favorites',
        onDelete: 'CASCADE'
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // 👈 evita que tengas que mandar id manualmente
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true, // 👈 evita correos duplicados
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,
      timestamps: false
    }
  );

  return User;
};
