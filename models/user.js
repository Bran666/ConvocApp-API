'use strict';
const bcrypt = require("bcryptjs");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Asociación con Role (usando tus nombres de campos)
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Asociación con Favorites (manteniendo tu configuración)
      User.hasMany(models.Favorite, {
        foreignKey: 'userId',
        as: 'favorites',
        onDelete: 'CASCADE'
      });
    }

    // Método para autenticar contraseña
    async authenticatePassword(password) {
      try {
        console.log("Contraseña proporcionada:", password);
        console.log("Contraseña almacenada:", this.password);
        
        // Comparación directa primero (para contraseñas en texto plano)
        if (password === this.password) {
          console.log("Coincidencia exacta de contraseña");
          return true;
        }
        
        // Intento con bcrypt por si está hasheada
        try {
          const valid = await bcrypt.compare(password, this.password);
          console.log("Resultado de bcrypt.compare:", valid);
          return valid;
        } catch (bcryptError) {
          console.log("Error en bcrypt.compare:", bcryptError.message);
          return false;
        }
      } catch (error) {
        console.error("Error general en authenticatePassword:", error);
        return false;
      }
    }
  }

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
        unique: true,
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true
    }
  );

  // Método estático para login
  User.login = async function (email, password) {
    const user = await User.findOne({
      where: {
        email: email,
        isActive: true,
      },
      include: [
        {
          association: 'role',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });

    if (!user) {
      return { status: 404, message: "Usuario inactivo o no encontrado" };
    }

    const valid = await user.authenticatePassword(password);
    
    if (valid) {
        const { password, ...userWithoutPassword } = user.toJSON();
        return { status: 200, user: userWithoutPassword };
    } else {
        return { status: 401, message: "Usuario y/o contraseña inválidos" };
    }
  };

  // Hook para encriptar contraseña
  const hashPassword = async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  };

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};