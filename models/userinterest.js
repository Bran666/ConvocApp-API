'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserInterest extends Model {
    static associate(models) {
      // Relación con User
      UserInterest.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // Relación con Interest
      UserInterest.belongsTo(models.Interest, {
        foreignKey: 'interestId',
        as: 'interest'
      });
    }
  }

  UserInterest.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
      primaryKey: true
    },
    interestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'interestId',
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'UserInterest',
    tableName: 'UserInterests',
    underscored: true,
    timestamps: false
  });

  return UserInterest;
};
