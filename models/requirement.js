'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Requirement.belongsTo(models.Institution, { foreignKey: 'institutionId' });
      Requirement.belongsTo(models.RequirementGroup, { foreignKey: 'groupId' });
    }
  }
  Requirement.init({
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    institutionId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Requirement',
  });
  return Requirement;
};