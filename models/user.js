'use strict';
const bcrypt = require("bcryptjs");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Asociación con Role (usando tus nombres de campos)
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
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

      // Commented out associations to non-existent models
      /* 
      // These models don't exist in the project yet
      User.belongsTo(models.Area, {
        foreignKey: 'area_id',
        as: 'area'
      });

      User.belongsTo(models.Position, {
        foreignKey: 'position_id',
        as: 'position'
      });

      User.belongsTo(models.ContractType, {
        foreignKey: 'contract_type_id',
        as: 'contractType'
      });

      User.belongsToMany(models.Zone, {
        through: 'user_zones',
        foreignKey: 'user_id',
        as: 'zones'
      });
      */
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
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      // Campos para restablecimiento de contraseña
      password_reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      password_reset_expires: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  // Método estático para login (adaptado a tus campos)
User.login = async function (email, password) {
  const user = await User.findOne({
    where: {
      email: email,
      is_active: true,
    },
    attributes: { 
      exclude: [
        'created_at', 
        'updated_at',
        'password_reset_token',
        'password_reset_expires'
        // 👇 OJO: NO excluyas "password"
      ] 
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

  // Hook para encriptar contraseña antes de crear
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // Hook para encriptar contraseña antes de actualizar si cambió
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // Método estático para actualizar contraseña
User.updatePassword = async function (id, password) {
  const user = await User.findByPk(id);
  if (!user) {
    return { status: 404, message: "Usuario no encontrado" };
  }
  
  // ❌ NO hacer hash aquí
  // user.password = await bcrypt.hash(password, 10);

  // ✅ Solo asigna la nueva contraseña
  user.password = password;
  await user.save();
  
  return user;
};

  return User;
};