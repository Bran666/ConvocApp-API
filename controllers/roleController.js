// controllers/roleController.js
const roleService = require("../services/roleService");

const getAllRoles = async (req, res) => {
    try {
        const allRoles = await roleService.getAllRoles();
        
        if (!allRoles || allRoles.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron roles"
            });
        }
        res.status(200).json({ status: "Ok", data: allRoles });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getRoleById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const role = await roleService.getRoleById(id);
        if (!role) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el rol con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: role });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                status: "Error",
                message: "Falta el campo obligatorio: name"
            });
        }

        const newRole = await roleService.createRole({ name });
        res.status(201).json({ status: "Ok", data: newRole });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateRole = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { name } = req.body;
        const updatedRole = await roleService.updateRole(id, { name });
        if (!updatedRole) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el rol con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedRole });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteRole = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedRole = await roleService.deleteRole(id);
        if (!deletedRole) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el rol con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Rol eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
};
