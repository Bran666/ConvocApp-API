'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', { // usa minúscula si quieres estándar
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
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',  // 👈 asegúrate que esta tabla exista antes
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      passwordResetToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Token para restablecimiento de contraseña'
      },
      passwordResetExpires: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Fecha de expiración del token de restablecimiento'
      },
      createdAt: {   // 👈 usa snake_case para ser consistente
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users'); // 👈 también en minúscula
  }
};
