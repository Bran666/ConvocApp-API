// Enlazamos el servicio (capa) de requirement_checks
const requirementCheckService = require("../services/requirementCheckService");
const { Company, Requirement } = require("../models");

const getAllRequirementChecks = async (req, res) => {
    try {
        const allChecks = await requirementCheckService.getAllRequirementChecks({
            includeCompany: true,
            includeRequirement: true
        });

        if (!allChecks || allChecks.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron registros de requirement_checks"
            });
        }

        res.status(200).json({ status: "Ok", data: allChecks });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getRequirementCheckById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const check = await requirementCheckService.getRequirementCheckById(id, {
            includeCompany: true,
            includeRequirement: true
        });

        if (!check) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró requirement_check con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: check });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createRequirementCheck = async (req, res) => {
    try {
        const { isChecked, companyId, requirementId } = req.body;

        if (companyId == null || requirementId == null) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: companyId, requirementId"
            });
        }

        // ✅ Validar existencia de Company
        const company = await Company.findByPk(companyId);
        if (!company) {
            return res.status(400).json({
                status: "Error",
                message: `No existe una Company con ID ${companyId}`
            });
        }

        // ✅ Validar existencia de Requirement
        const requirement = await Requirement.findByPk(requirementId);
        if (!requirement) {
            return res.status(400).json({
                status: "Error",
                message: `No existe un Requirement con ID ${requirementId}`
            });
        }

        const newCheck = await requirementCheckService.createRequirementCheck({
            isChecked: isChecked ?? false, // por defecto false
            companyId,
            requirementId
        });

        res.status(201).json({ status: "Ok", data: newCheck });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateRequirementCheck = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { isChecked, companyId, requirementId } = req.body;

        // ✅ Validar existencia de Company (si viene en el body)
        if (companyId != null) {
            const company = await Company.findByPk(companyId);
            if (!company) {
                return res.status(400).json({
                    status: "Error",
                    message: `No existe una Company con ID ${companyId}`
                });
            }
        }

        // ✅ Validar existencia de Requirement (si viene en el body)
        if (requirementId != null) {
            const requirement = await Requirement.findByPk(requirementId);
            if (!requirement) {
                return res.status(400).json({
                    status: "Error",
                    message: `No existe un Requirement con ID ${requirementId}`
                });
            }
        }

        const updatedCheck = await requirementCheckService.updateRequirementCheck(id, {
            isChecked,
            companyId,
            requirementId
        });

        if (!updatedCheck) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró requirement_check con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedCheck });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteRequirementCheck = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedCheck = await requirementCheckService.deleteRequirementCheck(id);
        if (!deletedCheck) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró requirement_check con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Requirement_check eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllRequirementChecks,
    getRequirementCheckById,
    createRequirementCheck,
    updateRequirementCheck,
    deleteRequirementCheck,
};
