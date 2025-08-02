'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CallAdditionalInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CallAdditionalInterest.belongsTo(models.Call, { foreignKey: 'callId' });
      CallAdditionalInterest.belongsTo(models.Interest, { foreignKey: 'interestId' });
    }
  }
  CallAdditionalInterest.init({
    callId: DataTypes.INTEGER,
    interestId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CallAdditionalInterest',
  });
  return CallAdditionalInterest;
};