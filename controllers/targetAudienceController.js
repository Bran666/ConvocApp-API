// Enlazamos el servicio (capa) de target audiences
const targetAudienceService = require("../services/targetAudienceService");

const getAllTargetAudiences = async (req, res) => {
    try {
        const allTargetAudiences = await targetAudienceService.getAllTargetAudiences();
        if (!allTargetAudiences || allTargetAudiences.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron públicos objetivos"
            });
        }
        res.status(200).json({ status: "Ok", data: allTargetAudiences });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getTargetAudienceById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const targetAudience = await targetAudienceService.getTargetAudienceById(id);
        if (!targetAudience) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el público objetivo con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: targetAudience });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createTargetAudience = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                status: "Error",
                message: "Falta el campo obligatorio: name"
            });
        }

        const newTargetAudience = await targetAudienceService.createTargetAudience({ name });
        res.status(201).json({ status: "Ok", data: newTargetAudience });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateTargetAudience = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { name } = req.body;
        const updatedTargetAudience = await targetAudienceService.updateTargetAudience(id, { name });
        if (!updatedTargetAudience) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el público objetivo con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedTargetAudience });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteTargetAudience = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deleted = await targetAudienceService.deleteTargetAudience(id);
        if (!deleted) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el público objetivo con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Público objetivo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllTargetAudiences,
    getTargetAudienceById,
    createTargetAudience,
    updateTargetAudience,
    deleteTargetAudience,
};
