'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city' // alias que usaremos en include
      });
    }
  }

  Company.init({
    name: DataTypes.STRING,
    taxId: {
      type: DataTypes.STRING,
      field: 'taxId'
    },
    legalName: {
      type: DataTypes.STRING,
      field: 'legalName'
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    employeeCount: {
      type: DataTypes.INTEGER,
      field: 'employeeCount'
    },
    economicSector: {
      type: DataTypes.STRING,
      field: 'economicSector'
    },
    description: DataTypes.TEXT,
    existenceYears: {
      type: DataTypes.INTEGER,
      field: 'existenceYears'
    },
    legalDocument: {
      type: DataTypes.STRING,
      field: 'legalDocument'
    },
    legalFirstName: {
      type: DataTypes.STRING,
      field: 'legalFirstName'
    },
    legalLastName: {
      type: DataTypes.STRING,
      field: 'legalLastName'
    },
    legalRepresentativeName: {
      type: DataTypes.STRING,
      field: 'legalRepresentativeName'
    },
    legalRepresentativeRole: {
      type: DataTypes.STRING,
      field: 'legalRepresentativeRole'
    },
    legalRepresentativePhone: {
      type: DataTypes.STRING,
      field: 'legalRepresentativePhone'
    },
    legalRepresentativeEmail: {
      type: DataTypes.STRING,
      field: 'legalRepresentativeEmail'
    },
    landline: DataTypes.STRING,
    legalMobile: {
      type: DataTypes.STRING,
      field: 'legalMobile'
    },
    email: DataTypes.STRING,
    legalPosition: {
      type: DataTypes.STRING,
      field: 'legalPosition'
    },
    cityId: {
      type: DataTypes.INTEGER,
      field: 'cityId'
    }
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'Companies',
    underscored: true,
    timestamps: false // igual que en City
  });

  return Company;
};
