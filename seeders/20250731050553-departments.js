'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments', [
      { name: 'Amazonas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Antioquia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Arauca', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Atlántico', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bogotá D.C.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bolívar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Boyacá', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Caldas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Caquetá', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Casanare', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cauca', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cesar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chocó', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Córdoba', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cundinamarca', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Guainía', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Guaviare', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Huila', createdAt: new Date(), updatedAt: new Date() },
      { name: 'La Guajira', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Magdalena', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Meta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nariño', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Norte de Santander', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Putumayo', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Quindío', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Risaralda', createdAt: new Date(), updatedAt: new Date() },
      { name: 'San Andrés y Providencia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Santander', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sucre', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tolima', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Valle del Cauca', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vaupés', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vichada', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};