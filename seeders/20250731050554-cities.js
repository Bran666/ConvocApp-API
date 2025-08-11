'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('cities', [
      {
        name: 'Bogotá',
        department_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Medellín',
        department_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Cali',
        department_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', {
      name: { [Sequelize.Op.in]: ['Bogotá', 'Medellín', 'Cali'] }
    }, {});
  }
};
