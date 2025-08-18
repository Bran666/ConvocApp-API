const { City, Department } = require("../models");

// Obtener todas las ciudades (opcionalmente con su departamento)
const getAllCities = async ({ includeDepartment = false } = {}) => {
    const options = {};
    if (includeDepartment) {
        options.include = [
            {
                model: Department,
                as: 'department'
            }
        ];
    }
    return City.findAll(options);
};

// Obtener una ciudad por ID
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

// Crear una nueva ciudad
const createCity = async (data) => {
    return City.create(data);
};

// Actualizar una ciudad
const updateCity = async (id, data) => {
    const [updated] = await City.update(data, { where: { id } });
    if (!updated) return null;
    return City.findByPk(id);
};

// Eliminar una ciudad
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
