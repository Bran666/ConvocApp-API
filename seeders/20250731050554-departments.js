'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('departments', [
      { name: 'Cundinamarca' },
      { name: 'Antioquia' },
      { name: 'Valle del Cauca' },
      { name: 'Santander' },
      { name: 'Tolima' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  }
};
