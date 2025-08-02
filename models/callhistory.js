'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CallHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CallHistory.init({
    originalId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    resources: DataTypes.TEXT,
    callLink: DataTypes.STRING,
    openDate: DataTypes.DATE,
    closeDate: DataTypes.DATE,
    pageName: DataTypes.STRING,
    pageUrl: DataTypes.STRING,
    objective: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    institutionId: DataTypes.INTEGER,
    lineId: DataTypes.INTEGER,
    targetAudienceId: DataTypes.INTEGER,
    interestId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CallHistory',
  });
  return CallHistory;
};