'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Call extends Model {
    static associate(models) {
      // Una convocatoria pertenece a una línea
      Call.belongsTo(models.Line, {
        foreignKey: 'lineId',
        as: 'line',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });

      // Una convocatoria pertenece a una institución
      Call.belongsTo(models.Institution, {
        foreignKey: 'institutionId',
        as: 'institution',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });

      // Una convocatoria pertenece a un usuario (creador)
      Call.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });

      // Una convocatoria puede estar en muchos favoritos
      Call.hasMany(models.Favorite, {
        foreignKey: 'callId',
        as: 'favorites',
        onDelete: 'CASCADE'
      });
    }
  }

  Call.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: DataTypes.TEXT,
    resources: DataTypes.TEXT,
    callLink: {
      type: DataTypes.STRING,
      field: 'callLink'
    },

    openDate: {
      type: DataTypes.DATE,
      field: 'openDate'
    },

    closeDate: {
      type: DataTypes.DATE,
      field: 'closeDate'
    },

    pageName: {
      type: DataTypes.STRING,
      field: 'pageName'
    },

    pageUrl: {
      type: DataTypes.STRING,
      field: 'pageUrl'
    },

    objective: DataTypes.TEXT,

    notes: DataTypes.TEXT,

    imageUrl: {
      type: DataTypes.STRING,
      field: 'imageUrl'
    },

    institutionId: {
      type: DataTypes.INTEGER,
      field: 'institutionId',
      allowNull: false
    },

    lineId: {
      type: DataTypes.INTEGER,
      field: 'lineId',
      allowNull: false
    },

    targetAudienceId: {
      type: DataTypes.INTEGER,
      field: 'targetAudienceId'
    },

    interestId: {
      type: DataTypes.INTEGER,
      field: 'interestId'
    },

    userId: {
      type: DataTypes.INTEGER,
      field: 'userId'
    },

    clickCount: {
      type: DataTypes.INTEGER,
      field: 'clickCount',
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Call',
    tableName: 'Calls',
    underscored: true,
    timestamps: false
  });

  return Call;
};
