'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles', // 👈 asegúrate que esta tabla exista antes
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      // ✅ Nuevo campo para imagen del usuario
      imgUser: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'URL de la imagen o avatar del usuario'
      },

      password_reset_token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Token para restablecimiento de contraseña'
      },
      password_reset_expires: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Fecha de expiración del token de restablecimiento'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
