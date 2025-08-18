const lineService = require("../services/lineService");

const getAllLines = async (req, res) => {
    try {
        const allLines = await lineService.getAllLines();
        if (!allLines || allLines.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron líneas"
            });
        }
        res.status(200).json({ status: "Ok", data: allLines });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getLineById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const line = await lineService.getLineById(id);
        if (!line) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la línea con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: line });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createLine = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                status: "Error",
                message: "Falta el campo obligatorio: name"
            });
        }

        const newLine = await lineService.createLine({ name, description });
        res.status(201).json({ status: "Ok", data: newLine });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateLine = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { name, description } = req.body;
        const updatedLine = await lineService.updateLine(id, { name, description });
        if (!updatedLine) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la línea con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedLine });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteLine = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedLine = await lineService.deleteLine(id);
        if (!deletedLine) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la línea con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Línea eliminada correctamente" });
    } catch (error) {
        if (error.message.includes('asociada a una o más convocatorias')) {
            return res.status(400).json({ status: "Error", message: error.message });
        }
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine,
};
