'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      taxId: {
        type: Sequelize.STRING
      },
      legalName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      employeeCount: {
        type: Sequelize.INTEGER
      },
      economicSector: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      existenceYears: {
        type: Sequelize.INTEGER
      },
      legalDocument: {
        type: Sequelize.STRING
      },
      legalFirstName: {
        type: Sequelize.STRING
      },
      legalLastName: {
        type: Sequelize.STRING
      },
      legalRepresentativeName: {
        type: Sequelize.STRING
      },
      legalRepresentativeRole: {
        type: Sequelize.STRING
      },
      legalRepresentativePhone: {
        type: Sequelize.STRING
      },
      legalRepresentativeEmail: {
        type: Sequelize.STRING
      },
      landline: {
        type: Sequelize.STRING
      },
      legalMobile: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      legalPosition: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities', // Asegúrate que así se llama tu tabla
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};
