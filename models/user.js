'use strict';
const bcrypt = require("bcryptjs");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Asociación con Role
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });

      // Asociación con Favoritos
      User.hasMany(models.Favorite, {
        foreignKey: 'userId',
        as: 'favorites',
        onDelete: 'CASCADE',
      });
    }

    // ==========================================================
    // 🔹 Método para autenticar contraseña
    // ==========================================================
    async authenticatePassword(password) {
      try {
        // Comparación directa (para texto plano)
        if (password === this.password) {
          return true;
        }

        // Intento con bcrypt
        const valid = await bcrypt.compare(password, this.password);
        return valid;
      } catch (error) {
        console.error("Error en authenticatePassword:", error);
        return false;
      }
    }
  }

  // ==========================================================
  // 🔹 Inicialización del modelo User
  // ==========================================================
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active', // ✅ Mapea correctamente con la BD
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'role_id', // ✅ Mapea correctamente con la BD
      },
      imgUser: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        
      },
      password_reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: 'password_reset_expires', // ✅ Corrige nombre real en BD
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: false,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  // ==========================================================
  // 🔹 Método estático para login
  // ==========================================================
  User.login = async function (email, password) {
    const user = await User.findOne({
      where: {
        email,
        is_active: true, // ✅ coincide con la BD gracias a `field`
      },
      attributes: {
        exclude: [
          'created_at',
          'updated_at',
          'password_reset_token',
          'password_reset_expires',
        ],
      },
      include: [
        {
          association: 'role',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      ],
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
  // 🔹 Hooks
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
  // 🔹 Actualizar contraseña (con hash)
  // ==========================================================
  User.updatePassword = async function (id, newPassword) {
    const user = await User.findByPk(id);
    if (!user) {
      return { status: 404, message: "Usuario no encontrado" };
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return user;
  };

  return User;
};
