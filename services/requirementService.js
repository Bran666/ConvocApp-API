const { Requirement, Institution, RequirementGroup } = require("../models");

const getAllRequirements = async ({ includeInstitution = false, includeRequirementGroup = false } = {}) => {
    const options = {};
    const include = [];

    if (includeInstitution) {
        include.push({
            model: Institution,
            as: 'institution'
        });
    }

    if (includeRequirementGroup) {
        include.push({
            model: RequirementGroup,
            as: 'requirementGroup'
        });
    }

    if (include.length > 0) {
        options.include = include;
    }

    return Requirement.findAll(options);
};

const getRequirementById = async (id, { includeInstitution = false, includeRequirementGroup = false } = {}) => {
    const options = { where: { id } };
    const include = [];

    if (includeInstitution) {
        include.push({
            model: Institution,
            as: 'institution'
        });
    }

    if (includeRequirementGroup) {
        include.push({
            model: RequirementGroup,
            as: 'requirementGroup'
        });
    }

    if (include.length > 0) {
        options.include = include;
    }

    return Requirement.findOne(options);
};

const createRequirement = async (data) => {
    return Requirement.create(data);
};

const updateRequirement = async (id, data) => {
    const [updated] = await Requirement.update(data, { where: { id } });
    if (!updated) return null;
    return Requirement.findByPk(id);
};

const deleteRequirement = async (id) => {
    const deleted = await Requirement.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllRequirements,
    getRequirementById,
    createRequirement,
    updateRequirement,
    deleteRequirement
};
