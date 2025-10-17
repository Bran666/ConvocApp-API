'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Lines", [
      {
        name : "Linea de Software",
        description : "Línea enfocada en convocatorias de desarrollo tecnológico, aplicaciones, IA y soluciones digitales.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Linea de Construccion",
        description : "Línea para proyectos de infraestructura, ingeniería civil, arquitectura y obras públicas.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Linea Industria",
        description : "Línea orientada a la optimización de procesos productivos, manufactura, logística y sector industrial.",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Cualquier Linea",
        description : "Línea abierta a proyectos de cualquier área del conocimiento, sin una especialización temática.",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Lines', null, {});
     */
     await queryInterface.bulkDelete('Lines', null, {});
  }
};