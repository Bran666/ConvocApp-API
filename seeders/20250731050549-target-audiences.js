'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TargetAudiences", [
      // == Sector Académico y Educativo ==
      {
        name : "Estudiantes de Pregrado",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Estudiantes de Posgrado",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Investigadores y Docentes",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Grupos de Investigación",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Universidades e Instituciones de Educación Superior",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Egresados y Graduados",
        createdAt : new Date(),
        updatedAt : new Date()
      },

      // == Sector Empresarial y Emprendimiento ==
      {
        name : "Emprendedores",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Startups y Empresas de Base Tecnológica",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "MiPymes (Micro, Pequeñas y Medianas Empresas)",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Empresas",
        createdAt : new Date(),
        updatedAt : new Date()
      },

      // == Sector Social, Cultural y Gubernamental ==
      {
        name : "Organizaciones No Gubernamentales (ONG) y Fundaciones",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Artistas y Gestores Culturales",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Deportistas y Clubes Deportivos",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Entidades del Sector Público",
        createdAt : new Date(),
        updatedAt : new Date()
      },

      // == Grupos Poblacionales Específicos ==
      {
        name : "Jóvenes",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Mujeres",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Población Vulnerable",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Grupos Étnicos",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Público General",
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('TargetAudiences', null, {});
     */
     await queryInterface.bulkDelete('TargetAudiences', null, {});
  }
};