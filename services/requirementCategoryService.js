const { RequirementCategory } = require("../models");

const getAllRequirementCategories = async () => {
    return RequirementCategory.findAll();
};

const getRequirementCategoryById = async (id) => {
    return RequirementCategory.findOne({ where: { id } });
};

const createRequirementCategory = async (data) => {
    return RequirementCategory.create(data);
};

const updateRequirementCategory = async (id, data) => {
    const [updated] = await RequirementCategory.update(data, { where: { id } });
    if (!updated) return null;
    return RequirementCategory.findByPk(id);
};

const deleteRequirementCategory = async (id) => {
    const deleted = await RequirementCategory.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllRequirementCategories,
    getRequirementCategoryById,
    createRequirementCategory,
    updateRequirementCategory,
    deleteRequirementCategory
};
