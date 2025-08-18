const { RequirementGroup, RequirementCategory, Requirement } = require("../models");

// Obtener todos los requirement_groups
const getAllRequirementGroups = async ({ includeCategory = false, includeRequirements = false } = {}) => {
    const options = {};
    const include = [];

    if (includeCategory) {
        include.push({
            model: RequirementCategory,
            as: 'category'
        });
    }

    if (includeRequirements) {
        include.push({
            model: Requirement,
            as: 'requirements'
        });
    }

    if (include.length > 0) {
        options.include = include;
    }

    return RequirementGroup.findAll(options);
};

// Obtener requirement_group por ID
const getRequirementGroupById = async (id, { includeCategory = false, includeRequirements = false } = {}) => {
    const options = { where: { id } };
    const include = [];

    if (includeCategory) {
        include.push({
            model: RequirementCategory,
            as: 'category'
        });
    }

    if (includeRequirements) {
        include.push({
            model: Requirement,
            as: 'requirements'
        });
    }

    if (include.length > 0) {
        options.include = include;
    }

    return RequirementGroup.findOne(options);
};

// Crear requirement_group
const createRequirementGroup = async (data) => {
    return RequirementGroup.create(data);
};

// Actualizar requirement_group
const updateRequirementGroup = async (id, data) => {
    const [updated] = await RequirementGroup.update(data, { where: { id } });
    if (!updated) return null;
    return RequirementGroup.findByPk(id);
};

// Eliminar requirement_group con verificación de relaciones
const deleteRequirementGroup = async (id) => {
    // Buscar el grupo incluyendo sus requirements
    const group = await RequirementGroup.findByPk(id, {
        include: [{ model: Requirement, as: 'requirements' }]
    });

    if (!group) return { success: false, message: 'No se encontró requirement_group con ese ID' };

    if (group.requirements && group.requirements.length > 0) {
        return {
            success: false,
            message: 'No se puede eliminar el grupo porque tiene requirements asociados'
        };
    }

    await group.destroy();
    return { success: true, message: 'Requirement_group eliminado correctamente' };
};


module.exports = {
    getAllRequirementGroups,
    getRequirementGroupById,
    createRequirementGroup,
    updateRequirementGroup,
    deleteRequirementGroup
};
