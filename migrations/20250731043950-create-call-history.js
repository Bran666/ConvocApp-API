'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CallHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      originalId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      resources: {
        type: Sequelize.TEXT
      },
      callLink: {
        type: Sequelize.STRING
      },
      openDate: {
        type: Sequelize.DATE
      },
      closeDate: {
        type: Sequelize.DATE
      },
      pageName: {
        type: Sequelize.STRING
      },
      pageUrl: {
        type: Sequelize.STRING
      },
      objective: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      institutionId: {
        type: Sequelize.INTEGER
      },
      lineId: {
        type: Sequelize.INTEGER
      },
      targetAudienceId: {
        type: Sequelize.INTEGER
      },
      interestId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CallHistories');
  }
};