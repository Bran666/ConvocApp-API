'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'empresa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'usuario',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', {
      name: { [Sequelize.Op.in]: ['admin', 'empresa', 'usuario'] }
    }, {});
  }
};
