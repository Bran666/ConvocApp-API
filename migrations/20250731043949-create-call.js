'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      resources: Sequelize.TEXT,
      call_link: Sequelize.STRING,   // 👈 en snake_case
      open_date: Sequelize.DATE,
      close_date: Sequelize.DATE,
      page_name: Sequelize.STRING,
      page_url: Sequelize.STRING,
      objective: Sequelize.TEXT,
      notes: Sequelize.TEXT,
      image_url: Sequelize.STRING,
      institution_id: {
        type: Sequelize.INTEGER,
        references: { model: 'institutions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      line_id: {
        type: Sequelize.INTEGER,
        references: { model: 'lines', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      target_audience_id: {
        type: Sequelize.INTEGER,
        references: { model: 'target_audiences', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      interest_id: {
        type: Sequelize.INTEGER,
        references: { model: 'interests', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      click_count: Sequelize.INTEGER,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('calls');
  }
};
