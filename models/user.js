'use strict';
const bcrypt = require("bcryptjs");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Asociación con Role
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      });

      // Asociación con Favorites
      User.hasMany(models.Favorite, {
        foreignKey: 'userId',
        as: 'favorites',
        onDelete: 'CASCADE'
      });

      // Otros modelos comentados
      /*
      User.belongsTo(models.Area, { foreignKey: 'area_id', as: 'area' });
      User.belongsTo(models.Position, { foreignKey: 'position_id', as: 'position' });
      User.belongsTo(models.ContractType, { foreignKey: 'contract_type_id', as: 'contractType' });
      User.belongsToMany(models.Zone, {
        through: 'user_zones',
        foreignKey: 'user_id',
        as: 'zones'
      });
      */
    }

    // ==========================================================
    // 🔹 Método para autenticar contraseña
    // ==========================================================
    async authenticatePassword(password) {
      try {
        console.log("Contraseña proporcionada:", password);
        console.log("Contraseña almacenada:", this.password);
        
        // Comparación directa (para texto plano)
        if (password === this.password) {
          console.log("Coincidencia exacta de contraseña");
          return true;
        }
        
        // Intento con bcrypt
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

  // ==========================================================
  // 🔹 Inicialización del modelo User
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
      // ✅ Campo nuevo para la imagen del usuario
      imgUser: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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
      password_reset_token: {
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
      underscored: false,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  // ==========================================================
  // 🔹 Método estático para login
  // ==========================================================
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
  // 🔹 Actualizar contraseña (sin hash)
  // ==========================================================
  User.updatePassword = async function (id, password) {
    const user = await User.findByPk(id);
    if (!user) {
      return { status: 404, message: "Usuario no encontrado" };
    }

    user.password = password;
    await user.save();
    
    return user;
  };

  return User;
};
