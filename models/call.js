'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Call extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con Institution
      Call.belongsTo(models.Institution, { foreignKey: 'institutionId' });
      // Relación con Line
      Call.belongsTo(models.Line, { foreignKey: 'lineId' });
      // Relación con TargetAudience
      Call.belongsTo(models.TargetAudience, { foreignKey: 'targetAudienceId' });
      // Relación con Interest
      Call.belongsTo(models.Interest, { foreignKey: 'interestId' });
      // Relación con User
      Call.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Call.init({
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
    clickCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Call',
  });
  return Call;
};