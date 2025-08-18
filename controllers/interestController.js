// Enlazamos el servicio (capa) de intereses
const interestService = require("../services/interestService");

const getAllInterests = async (req, res) => {
    try {
        const allInterests = await interestService.getAllInterests();
        if (!allInterests || allInterests.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron intereses"
            });
        }
        res.status(200).json({ status: "Ok", data: allInterests });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getInterestById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const interest = await interestService.getInterestById(id);
        if (!interest) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el interés con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: interest });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createInterest = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                status: "Error",
                message: "Falta el campo obligatorio: name"
            });
        }

        const newInterest = await interestService.createInterest({ name, description });
        res.status(201).json({ status: "Ok", data: newInterest });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateInterest = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { name, description } = req.body;
        const updatedInterest = await interestService.updateInterest(id, { name, description });
        if (!updatedInterest) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el interés con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedInterest });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteInterest = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedInterest = await interestService.deleteInterest(id);
        if (!deletedInterest) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el interés con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Interés eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllInterests,
    getInterestById,
    createInterest,
    updateInterest,
    deleteInterest,
};
