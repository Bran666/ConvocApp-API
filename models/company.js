'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.belongsTo(models.City, { foreignKey: 'cityId' });
    }
  }
  Company.init({
    name: DataTypes.STRING,
    taxId: DataTypes.STRING,
    legalName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    employeeCount: DataTypes.INTEGER,
    economicSector: DataTypes.STRING,
    description: DataTypes.TEXT,
    existenceYears: DataTypes.INTEGER,
    legalDocument: DataTypes.STRING,
    legalFirstName: DataTypes.STRING,
    legalLastName: DataTypes.STRING,
    legalRepresentativeName: DataTypes.STRING,
    legalRepresentativeRole: DataTypes.STRING,
    legalRepresentativePhone: DataTypes.STRING,
    legalRepresentativeEmail: DataTypes.STRING,
    landline: DataTypes.STRING,
    legalMobile: DataTypes.STRING,
    email: DataTypes.STRING,
    legalPosition: DataTypes.STRING,
    cityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};