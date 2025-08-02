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
        type: Sequelize.INTEGER,
        references: {
          model: 'Institutions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      lineId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      targetAudienceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TargetAudiences',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      interestId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Interests',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      clickCount: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Calls');
  }
};