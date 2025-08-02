'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      departmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Departments', // Nombre exacto de la tabla
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // o 'CASCADE' si quieres eliminar también las ciudades asociadas
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cities');
  }
};
