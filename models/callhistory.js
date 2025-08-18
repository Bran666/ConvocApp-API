'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CallHistory extends Model {
    static associate(models) {
      // Relación con Calls (original)
      CallHistory.belongsTo(models.Call, {
        foreignKey: 'originalId',
        as: 'originalCall'
      });

      // Relación con Institution
      CallHistory.belongsTo(models.Institution, {
        foreignKey: 'institutionId',
        as: 'institution'
      });

      // Relación con Line
      CallHistory.belongsTo(models.Line, {
        foreignKey: 'lineId',
        as: 'line'
      });

      // Relación con TargetAudience
      CallHistory.belongsTo(models.TargetAudience, {
        foreignKey: 'targetAudienceId',
        as: 'targetAudience'
      });

      // Relación con Interest
      CallHistory.belongsTo(models.Interest, {
        foreignKey: 'interestId',
        as: 'interest'
      });

      // Relación con User
      CallHistory.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  CallHistory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    originalId: {
      type: DataTypes.INTEGER,
      field: 'original_id'
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: DataTypes.TEXT,
    resources: DataTypes.TEXT,
    callLink: {
      type: DataTypes.STRING(255),
      field: 'call_link'
    },
    openDate: {
      type: DataTypes.DATE,
      field: 'open_date'
    },
    closeDate: {
      type: DataTypes.DATEONLY,
      field: 'close_date'
    },
    pageName: {
      type: DataTypes.STRING(100),
      field: 'page_name'
    },
    pageUrl: {
      type: DataTypes.STRING(255),
      field: 'page_url'
    },
    objective: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING(255),
      field: 'image_url'
    },
    institutionId: {
      type: DataTypes.INTEGER,
      field: 'institution_id'
    },
    lineId: {
      type: DataTypes.INTEGER,
      field: 'line_id'
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
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active',
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'CallHistory',
    tableName: 'call_history',
    underscored: true,
    timestamps: false // 👈 porque en la tabla no existe updated_at
  });

  return CallHistory;
};
