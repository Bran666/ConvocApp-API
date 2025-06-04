'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('convocatorias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idConvocatorias: {
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      recursos: {
        type: Sequelize.TEXT
      },
      linkConvocatoria: {
        type: Sequelize.STRING
      },
      fechaApertura: {
        type: Sequelize.STRING
      },
      fechaCierre: {
        type: Sequelize.STRING
      },
      nombrePagina: {
        type: Sequelize.STRING
      },
      pagina: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('convocatorias');
  }
};