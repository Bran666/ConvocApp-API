// Enlazamos el servicio (capa) de ciudades
const cityService = require("../services/cityService");

const getAllCities = async (req, res) => {
    try {
        const allCities = await cityService.getAllCities({ includeDepartment: true });
        if (!allCities || allCities.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron ciudades"
            });
        }
        res.status(200).json({ status: "Ok", data: allCities });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getCityById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const city = await cityService.getCityById(id, { includeDepartment: true });
        if (!city) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la ciudad con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: city });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createCity = async (req, res) => {
    try {
        const { name, departmentId } = req.body;

        if (!name || !departmentId) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: name, departmentId"
            });
        }

        const newCity = await cityService.createCity({ name, departmentId });
        res.status(201).json({ status: "Ok", data: newCity });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { name, departmentId } = req.body;
        const updatedCity = await cityService.updateCity(id, { name, departmentId });
        if (!updatedCity) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la ciudad con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedCity });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedCity = await cityService.deleteCity(id);
        if (!deletedCity) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la ciudad con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Ciudad eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity,
};
