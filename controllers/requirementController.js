// Enlazamos el servicio de requirements
const requirementService = require("../services/requirementService");

const getAllRequirements = async (req, res) => {
    try {
        const allRequirements = await requirementService.getAllRequirements({
            includeInstitution: true,
            includeRequirementGroup: true
        });

        if (!allRequirements || allRequirements.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron requisitos"
            });
        }

        res.status(200).json({ status: "Ok", data: allRequirements });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getRequirementById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const requirement = await requirementService.getRequirementById(id, {
            includeInstitution: true,
            includeRequirementGroup: true
        });

        if (!requirement) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el requisito con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: requirement });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createRequirement = async (req, res) => {
    try {
        const { name, notes, institutionId, groupId } = req.body;

        if (!name || !institutionId || !groupId) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: name, institutionId, groupId"
            });
        }

        const newRequirement = await requirementService.createRequirement({
            name,
            notes,
            institutionId,
            groupId
        });

        res.status(201).json({ status: "Ok", data: newRequirement });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateRequirement = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { name, notes, institutionId, groupId } = req.body;

        const updatedRequirement = await requirementService.updateRequirement(id, {
            name,
            notes,
            institutionId,
            groupId
        });

        if (!updatedRequirement) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el requisito con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedRequirement });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteRequirement = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedRequirement = await requirementService.deleteRequirement(id);

        if (!deletedRequirement) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el requisito con ID ${id}`
            });
        }

        res.status(200).json({
            status: "Ok",
            message: "Requisito eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllRequirements,
    getRequirementById,
    createRequirement,
    updateRequirement,
    deleteRequirement
};
