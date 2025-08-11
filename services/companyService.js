const { Company, City } = require("../models");

const getAllCompanies = async ({ includeCity = false } = {}) => {
    const options = {};
    if (includeCity) {
        options.include = [
            {
                model: City,
                as: 'city' // alias según belongsTo
            }
        ];
    }
    return Company.findAll(options);
};

const getCompanyById = async (id, { includeCity = false } = {}) => {
    const options = { where: { id } };
    if (includeCity) {
        options.include = [
            {
                model: City,
                as: 'city'
            }
        ];
    }
    return Company.findOne(options);
};

const createCompany = async (data) => {
    return Company.create(data);
};

const updateCompany = async (id, data) => {
    const [updated] = await Company.update(data, { where: { id } });
    if (!updated) return null;
    return Company.findByPk(id);
};

const deleteCompany = async (id) => {
    const deleted = await Company.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};
