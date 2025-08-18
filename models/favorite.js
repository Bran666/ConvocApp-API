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
      field: 'user_id'
    },
    callId: {
      type: DataTypes.INTEGER,
      field: 'call_id'
    },
    favoritedAt: {
      type: DataTypes.DATE,
      field: 'favorited_at',
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
    underscored: true,
    timestamps: false
  });

  return Favorite;
};
