// Enlazamos el servicio (capa) de institutions
const institutionService = require("../services/institutionService");

const getAllInstitutions = async (req, res) => {
    try {
        const allInstitutions = await institutionService.getAllInstitutions();
        if (!allInstitutions || allInstitutions.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron instituciones"
            });
        }
        res.status(200).json({ status: "Ok", data: allInstitutions });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getInstitutionById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El id debe ser un número válido"
            });
        }

        const institution = await institutionService.getInstitutionById(id);
        if (!institution) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la institución con id=${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: institution });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createInstitution = async (req, res) => {
    try {
        const { name, website } = req.body;

        if (!name) {
            return res.status(400).json({
                status: "Error",
                message: "El campo 'name' es obligatorio"
            });
        }

        const newInstitution = await institutionService.createInstitution({ name, website });
        res.status(201).json({ status: "Ok", data: newInstitution });
    } catch (error) {
        // Captura específica de duplicados
        if (error.message.includes("llave duplicada") || error.message.includes("duplicate key")) {
            return res.status(409).json({
                status: "Error",
                message: "Ya existe una institución con ese nombre"
            });
        }
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateInstitution = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El id debe ser un número válido"
            });
        }

        // Validar existencia antes de actualizar
        const existingInstitution = await institutionService.getInstitutionById(id);
        if (!existingInstitution) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la institución con id=${id}`
            });
        }

        const updatedInstitution = await institutionService.updateInstitution(id, req.body);
        res.status(200).json({ status: "Ok", data: updatedInstitution });
    } catch (error) {
        if (error.message.includes("llave duplicada") || error.message.includes("duplicate key")) {
            return res.status(409).json({
                status: "Error",
                message: "Ya existe una institución con ese nombre"
            });
        }
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteInstitution = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El id debe ser un número válido"
            });
        }

        const deleted = await institutionService.deleteInstitution(id);
        if (!deleted) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la institución con id=${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Institución eliminada correctamente" });
    } catch (error) {
        // 🚨 Captura específica para violación de FK
        if (error.message.includes("llave foránea") || error.message.includes("foreign key")) {
            return res.status(400).json({
                status: "Error",
                message: "No se puede eliminar la institución porque está asociada a registros en 'calls'"
            });
        }

        res.status(500).json({ status: "Error", message: error.message });
    }
};


module.exports = {
    getAllInstitutions,
    getInstitutionById,
    createInstitution,
    updateInstitution,
    deleteInstitution,
};
