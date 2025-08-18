const { Institution } = require("../models");

// Obtener todos los registros
const getAllInstitutions = async () => {
    return Institution.findAll();
};

// Obtener un registro por ID
const getInstitutionById = async (id) => {
    return Institution.findByPk(id);
};

// Crear un nuevo registro
const createInstitution = async (data) => {
    const newRecord = await Institution.create(data);
    return Institution.findByPk(newRecord.id);
};

// Actualizar un registro
const updateInstitution = async (id, data) => {
    const [updated] = await Institution.update(data, { where: { id } });
    if (!updated) return null;
    return Institution.findByPk(id);
};

// Eliminar un registro
const deleteInstitution = async (id) => {
    const deleted = await Institution.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllInstitutions,
    getInstitutionById,
    createInstitution,
    updateInstitution,
    deleteInstitution
};
