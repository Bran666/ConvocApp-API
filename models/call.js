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
      field: 'call_link'
    },
    openDate: {
      type: DataTypes.DATE,
      field: 'open_date'
    },
    closeDate: {
      type: DataTypes.DATE,
      field: 'close_date'
    },
    pageName: {
      type: DataTypes.STRING,
      field: 'page_name'
    },
    pageUrl: {
      type: DataTypes.STRING,
      field: 'page_url'
    },
    objective: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING,
      field: 'image_url'
    },
    institutionId: {
      type: DataTypes.INTEGER,
      field: 'institution_id',
      allowNull: false
    },
    lineId: {
      type: DataTypes.INTEGER,
      field: 'line_id',
      allowNull: false
    },
    targetAudienceId: {
      type: DataTypes.INTEGER,
      field: 'target_audience_id'
    },
    interestId: {
      type: DataTypes.INTEGER,
      field: 'interest_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    clickCount: {
      type: DataTypes.INTEGER,
      field: 'click_count',
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Call',
    tableName: 'calls',
    underscored: true,
    timestamps: false
  });

  return Call;
};
