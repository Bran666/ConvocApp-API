'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments', [
      {
        name: 'Cundinamarca',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Antioquia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Valle del Cauca',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Santander',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tolima',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  }
};
