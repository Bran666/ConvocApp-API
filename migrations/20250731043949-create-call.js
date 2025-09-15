'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Calls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      resources: Sequelize.TEXT,
      callLink: Sequelize.STRING,   // 👈 snake_case
      openDate: Sequelize.DATE,
      closeDate: Sequelize.DATE,
      pageName: Sequelize.STRING,
      pageUrl: Sequelize.STRING,
      objective: Sequelize.TEXT,
      notes: Sequelize.TEXT,
      imageUrl: Sequelize.STRING,

      institutionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Institutions', key: 'id' }, // 👈 minúsculas
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      lineId: {
        type: Sequelize.INTEGER,
        references: { model: 'Lines', key: 'id' }, // 👈 minúsculas
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      targetAudienceId: {
        type: Sequelize.INTEGER,
        references: { model: 'TargetAudiences', key: 'id' }, // 👈 minúsculas
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      interestId: {
        type: Sequelize.INTEGER,
        references: { model: 'Interests', key: 'id' }, // 👈 minúsculas
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }, // 👈 minúsculas
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      clickCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Calls');
  }
};
