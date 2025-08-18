const { TargetAudience } = require("../models");

const getAllTargetAudiences = async () => {
    return TargetAudience.findAll();
};

const getTargetAudienceById = async (id) => {
    return TargetAudience.findOne({ where: { id } });
};

const createTargetAudience = async (data) => {
    return TargetAudience.create(data);
};

const updateTargetAudience = async (id, data) => {
    const [updated] = await TargetAudience.update(data, { where: { id } });
    if (!updated) return null;
    return TargetAudience.findByPk(id);
};

const deleteTargetAudience = async (id) => {
    const deleted = await TargetAudience.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllTargetAudiences,
    getTargetAudienceById,
    createTargetAudience,
    updateTargetAudience,
    deleteTargetAudience
};
