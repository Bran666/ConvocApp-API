'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      razonSocial: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      paginaWeb: {
        type: Sequelize.STRING
      },
      numEmpleados: {
        type: Sequelize.INTEGER
      },
      sectorEconomico: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      tiempoExistencia: {
        type: Sequelize.INTEGER
      },
      documentoLegal: {
        type: Sequelize.STRING
      },
      nombreLegal: {
        type: Sequelize.STRING
      },
      apellidoLegal: {
        type: Sequelize.STRING
      },
      telefonoFijo: {
        type: Sequelize.STRING
      },
      celularLegal: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      cargoLegal: {
        type: Sequelize.STRING
      },
      fkIdCiudad: {
        type: Sequelize.INTEGER
      },
      fkIdUsuario: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('empresas');
  }
};