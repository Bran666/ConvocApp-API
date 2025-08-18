// Enlazamos el servicio (capa) de requirement_groups
const requirementGroupService = require("../services/requirementGroupService");
const { RequirementCategory } = require("../models");

const getAllRequirementGroups = async (req, res) => {
    try {
        const allGroups = await requirementGroupService.getAllRequirementGroups({
            includeCategory: true,
            includeRequirements: true
        });

        if (!allGroups || allGroups.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron registros de requirement_groups"
            });
        }

        res.status(200).json({ status: "Ok", data: allGroups });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getRequirementGroupById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const group = await requirementGroupService.getRequirementGroupById(id, {
            includeCategory: true,
            includeRequirements: true
        });

        if (!group) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró requirement_group con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: group });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createRequirementGroup = async (req, res) => {
    try {
        const { name, categoryId } = req.body;

        if (!name || !categoryId) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: name, categoryId"
            });
        }

        // ✅ Validar existencia de RequirementCategory
        const category = await RequirementCategory.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({
                status: "Error",
                message: `No existe un RequirementCategory con ID ${categoryId}`
            });
        }

        const newGroup = await requirementGroupService.createRequirementGroup({
            name,
            categoryId
        });

        res.status(201).json({ status: "Ok", data: newGroup });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateRequirementGroup = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { name, categoryId } = req.body;

        // ✅ Validar existencia de RequirementCategory (si viene en el body)
        if (categoryId != null) {
            const category = await RequirementCategory.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({
                    status: "Error",
                    message: `No existe un RequirementCategory con ID ${categoryId}`
                });
            }
        }

        const updatedGroup = await requirementGroupService.updateRequirementGroup(id, {
            name,
            categoryId
        });

        if (!updatedGroup) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró requirement_group con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedGroup });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteRequirementGroup = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const result = await requirementGroupService.deleteRequirementGroup(id);

        if (!result.success) {
            return res.status(400).json({ status: "Error", message: result.message });
        }

        res.status(200).json({ status: "Ok", message: result.message });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllRequirementGroups,
    getRequirementGroupById,
    createRequirementGroup,
    updateRequirementGroup,
    deleteRequirementGroup,
};
