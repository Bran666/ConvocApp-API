'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequirementCheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RequirementCheck.belongsTo(models.Company, { foreignKey: 'companyId' });
      RequirementCheck.belongsTo(models.Requirement, { foreignKey: 'requirementId' });
    }
  }
  RequirementCheck.init({
    isChecked: DataTypes.BOOLEAN,
    companyId: DataTypes.INTEGER,
    requirementId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RequirementCheck',
  });
  return RequirementCheck;
};