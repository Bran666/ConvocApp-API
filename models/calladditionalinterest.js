'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CallAdditionalInterest extends Model {
    static associate(models) {
      // Relación con Call
      CallAdditionalInterest.belongsTo(models.Call, {
        foreignKey: 'callId',
        as: 'call'
      });

      // Relación con Interest
      CallAdditionalInterest.belongsTo(models.Interest, {
        foreignKey: 'interestId',
        as: 'interest'
      });
    }
  }

  CallAdditionalInterest.init({
    callId: {
      type: DataTypes.INTEGER,
      field: 'callId',
      primaryKey: true
    },
    interestId: {
      type: DataTypes.INTEGER,
      field: 'interestId',
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'CallAdditionalInterest',
    tableName: 'CallAdditionalInterests',
    underscored: true,
    timestamps: false // 👈 porque la tabla no tiene created_at ni updated_at
  });

  return CallAdditionalInterest;
};
