'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Institutions", [
      {
        name : "Minciencias",
        website : "https://minciencias.gov.co/convocatorias/todas",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Universidad Industrial de Santander",
        website : "https://convocatorias.uis.edu.co/",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Apps.co",
        website : "https://apps.co/portal/Secciones/Convocatorias/",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
