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
      field: 'tax_id'
    },
    legalName: {
      type: DataTypes.STRING,
      field: 'legal_name'
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    employeeCount: {
      type: DataTypes.INTEGER,
      field: 'employee_count'
    },
    economicSector: {
      type: DataTypes.STRING,
      field: 'economic_sector'
    },
    description: DataTypes.TEXT,
    existenceYears: {
      type: DataTypes.INTEGER,
      field: 'existence_years'
    },
    legalDocument: {
      type: DataTypes.STRING,
      field: 'legal_document'
    },
    legalFirstName: {
      type: DataTypes.STRING,
      field: 'legal_first_name'
    },
    legalLastName: {
      type: DataTypes.STRING,
      field: 'legal_last_name'
    },
    legalRepresentativeName: {
      type: DataTypes.STRING,
      field: 'legal_representative_name'
    },
    legalRepresentativeRole: {
      type: DataTypes.STRING,
      field: 'legal_representative_role'
    },
    legalRepresentativePhone: {
      type: DataTypes.STRING,
      field: 'legal_representative_phone'
    },
    legalRepresentativeEmail: {
      type: DataTypes.STRING,
      field: 'legal_representative_email'
    },
    landline: DataTypes.STRING,
    legalMobile: {
      type: DataTypes.STRING,
      field: 'legal_mobile'
    },
    email: DataTypes.STRING,
    legalPosition: {
      type: DataTypes.STRING,
      field: 'legal_position'
    },
    cityId: {
      type: DataTypes.INTEGER,
      field: 'city_id'
    }
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    underscored: true,
    timestamps: false // igual que en City
  });

  return Company;
};
