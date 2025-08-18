const { RequirementCheck, Company, Requirement } = require("../models");

// Obtener todos los requirement_checks
const getAllRequirementChecks = async ({ includeCompany = false, includeRequirement = false } = {}) => {
    const options = {};
    const include = [];

    if (includeCompany) {
        include.push({
            model: Company,
            as: 'company'
        });
    }

    if (includeRequirement) {
        include.push({
            model: Requirement,
            as: 'requirement'
        });
    }

    if (include.length > 0) {
        options.include = include;
    }

    return RequirementCheck.findAll(options);
};

// Obtener requirement_check por ID
const getRequirementCheckById = async (id, { includeCompany = false, includeRequirement = false } = {}) => {
    const options = { where: { id } };
    const include = [];

    if (includeCompany) {
        include.push({
            model: Company,
            as: 'company'
        });
    }

    if (includeRequirement) {
        include.push({
            model: Requirement,
            as: 'requirement'
        });
    }

    if (include.length > 0) {
        options.include = include;
    }

    return RequirementCheck.findOne(options);
};

// Crear requirement_check
const createRequirementCheck = async (data) => {
    return RequirementCheck.create(data);
};

// Actualizar requirement_check
const updateRequirementCheck = async (id, data) => {
    const [updated] = await RequirementCheck.update(data, { where: { id } });
    if (!updated) return null;
    return RequirementCheck.findByPk(id);
};

// Eliminar requirement_check
const deleteRequirementCheck = async (id) => {
    const deleted = await RequirementCheck.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllRequirementChecks,
    getRequirementCheckById,
    createRequirementCheck,
    updateRequirementCheck,
    deleteRequirementCheck
};
