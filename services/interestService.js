const { Interest } = require("../models");

const getAllInterests = async () => {
    return Interest.findAll();
};

const getInterestById = async (id) => {
    return Interest.findOne({ where: { id } });
};

const createInterest = async (data) => {
    return Interest.create(data);
};

const updateInterest = async (id, data) => {
    const [updated] = await Interest.update(data, { where: { id } });
    if (!updated) return null;
    return Interest.findByPk(id);
};

const deleteInterest = async (id) => {
    const deleted = await Interest.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllInterests,
    getInterestById,
    createInterest,
    updateInterest,
    deleteInterest
};
