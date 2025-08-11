const { City, Department } = require("../models");

const getAllCities = async ({ includeDepartment = false } = {}) => {
    const options = {};
    if (includeDepartment) {
        options.include = [
            {
                model: Department,
                as: 'department' // alias según belongsTo
            }
        ];
    }
    return City.findAll(options);
};

const getCityById = async (id, { includeDepartment = false } = {}) => {
    const options = { where: { id } };
    if (includeDepartment) {
        options.include = [
            {
                model: Department,
                as: 'department'
            }
        ];
    }
    return City.findOne(options);
};

const createCity = async (data) => {
    return City.create(data);
};

const updateCity = async (id, data) => {
    const [updated] = await City.update(data, { where: { id } });
    if (!updated) return null;
    return City.findByPk(id);
};

const deleteCity = async (id) => {
    const deleted = await City.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity
};
