'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Favorite.belongsTo(models.Call, {
        foreignKey: 'callId',
        as: 'call'
      });
    }
  }

  Favorite.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'userId'
    },
    callId: {
      type: DataTypes.INTEGER,
      field: 'callId'
    },
    favoritedAt: {
      type: DataTypes.DATE,
      field: 'favoritedAt',
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'Favorites',
    timestamps: true
  });

  return Favorite;
};
