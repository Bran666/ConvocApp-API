'use strict';
const bcrypt = require("bcryptjs");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // ==========================================================
    // 🔹 Asociaciones con otras tablas
    // ==========================================================
    static associate(models) {
      // 🔸 Rol del usuario
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      // 🔸 Favoritos del usuario
      User.hasMany(models.Favorite, {
        foreignKey: 'userId',
        as: 'favorites',
        onDelete: 'CASCADE'
      });
    }

    // ==========================================================
    // 🔹 Verificación de contraseña
    // ==========================================================
    async authenticatePassword(password) {
      try {
        if (password === this.password) return true;
        return await bcrypt.compare(password, this.password);
      } catch (error) {
        console.error("Error en authenticatePassword:", error);
        return false;
      }
    }
  }

  // ==========================================================
  // 🔹 Inicialización del modelo
  // ==========================================================
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      // 🖼️ Imagen del usuario
      imgUser: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'URL o ruta de la imagen de perfil del usuario'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      password_reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true, // ✅ Sequelize creará automáticamente createdAt y updatedAt
    }
  );

  // ==========================================================
  // 🔹 Método estático de login
  // ==========================================================
  User.login = async function (email, password) {
    const user = await User.findOne({
      where: { email, isActive: true },
      attributes: {
        exclude: [
          'password_reset_token',
          'passwordResetExpires',
          'createdAt',
          'updatedAt'
        ]
      },
      include: [
        {
          association: 'role',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    });

    if (!user) {
      return { status: 404, message: "Usuario inactivo o no encontrado" };
    }

    const valid = await user.authenticatePassword(password);
    return valid
      ? { status: 200, user }
      : { status: 401, message: "Usuario y/o contraseña inválidos" };
  };

  // ==========================================================
  // 🔹 Hooks — Hash automático de contraseñas
  // ==========================================================
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // ==========================================================
  // 🔹 Actualización manual de contraseña
  // ==========================================================
  User.updatePassword = async function (id, newPassword) {
    const user = await User.findByPk(id);
    if (!user) return { status: 404, message: "Usuario no encontrado" };

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return user;
  };

  return User;
};
