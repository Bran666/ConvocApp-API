'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Cities', [
      {
        name: 'Bogotá',
        departmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Medellín',
        departmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cali',
        departmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', {
      name: { [Sequelize.Op.in]: ['Bogotá', 'Medellín', 'Cali'] }
    }, {});
  }
};
