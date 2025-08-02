'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequirementGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RequirementGroup.belongsTo(models.RequirementCategory, { foreignKey: 'categoryId' });
    }
  }
  RequirementGroup.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RequirementGroup',
  });
  return RequirementGroup;
};