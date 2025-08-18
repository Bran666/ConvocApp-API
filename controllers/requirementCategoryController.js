// Enlazamos el servicio (capa) de requirement_categories
const requirementCategoryService = require("../services/requirementCategoryService");

const getAllRequirementCategories = async (req, res) => {
    try {
        const allCategories = await requirementCategoryService.getAllRequirementCategories();
        if (!allCategories || allCategories.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron categorías de requerimientos"
            });
        }
        res.status(200).json({ status: "Ok", data: allCategories });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getRequirementCategoryById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const category = await requirementCategoryService.getRequirementCategoryById(id);
        if (!category) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la categoría con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: category });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createRequirementCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                status: "Error",
                message: "El campo 'name' es obligatorio"
            });
        }

        const newCategory = await requirementCategoryService.createRequirementCategory({ name });
        res.status(201).json({ status: "Ok", data: newCategory });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateRequirementCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { name } = req.body;
        const updatedCategory = await requirementCategoryService.updateRequirementCategory(id, { name });
        if (!updatedCategory) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la categoría con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteRequirementCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedCategory = await requirementCategoryService.deleteRequirementCategory(id);
        if (!deletedCategory) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la categoría con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Categoría eliminada correctamente" });
    } catch (error) {
        // 🚨 Captura de error por llave foránea (FK constraint)
        if (error.name === "SequelizeForeignKeyConstraintError" || error.parent?.code === "23503") {
            return res.status(400).json({
                status: "Error",
                message: `No se puede eliminar la categoría con ID ${req.params.id} porque tiene elementos relacionados`
            });
        }

        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllRequirementCategories,
    getRequirementCategoryById,
    createRequirementCategory,
    updateRequirementCategory,
    deleteRequirementCategory,
};