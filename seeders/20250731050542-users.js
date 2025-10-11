'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456', // Idealmente, deberías hashear la contraseña si es real.
      phone: '123456',
      isActive: true,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'john@example.com' }, {});
  }
};
