// services/roleService.js
const { Role } = require("../models");

const getAllRoles = async () => {
    return Role.findAll();
};

const getRoleById = async (id) => {
    return Role.findOne({ where: { id } });
};

const createRole = async (data) => {
    return Role.create(data);
};

const updateRole = async (id, data) => {
    const [updated] = await Role.update(data, { where: { id } });
    if (!updated) return null;
    return Role.findByPk(id);
};

const deleteRole = async (id) => {
    const deleted = await Role.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};
