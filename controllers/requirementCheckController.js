// Enlazamos el servicio (capa) de requirement_checks
const requirementCheckService = require("../services/requirementCheckService");
const { Company, Requirement, User } = require("../models");

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
    const { isChecked, companyId, requirementId, userId } = req.body;

    // ✅ Validación flexible: debe tener requirementId y al menos un ID de entidad
    if (!requirementId || (!companyId && !userId)) {
      return res.status(400).json({
        status: "Error",
        message: "Faltan campos obligatorios: requirementId y (companyId o userId)"
      });
    }

    // ✅ Validar Requirement
    const requirement = await Requirement.findByPk(requirementId);
    if (!requirement) {
      return res.status(400).json({
        status: "Error",
        message: `No existe un Requirement con ID ${requirementId}`
      });
    }

    // ✅ Validar Company (si aplica)
    if (companyId) {
      const company = await Company.findByPk(companyId);
      if (!company) {
        return res.status(400).json({
          status: "Error",
          message: `No existe una Company con ID ${companyId}`
        });
      }
    }

    // ✅ Validar User (si aplica)
    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({
          status: "Error",
          message: `No existe un User con ID ${userId}`
        });
      }
    }

    // ✅ Crear registro
    const newCheck = await requirementCheckService.createRequirementCheck({
      isChecked: isChecked ?? false,
      companyId,
      requirementId,
      userId
    });

    return res.status(201).json({ status: "Ok", data: newCheck });
  } catch (error) {
    console.error("❌ Error en createRequirementCheck:", error);
    return res.status(500).json({ status: "Error", message: error.message });
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

        const { isChecked, companyId, requirementId, userId } = req.body;

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

        // ✅ Validar existencia de User (si viene en el body)
        if (userId != null) {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(400).json({
                    status: "Error",
                    message: `No existe un User con ID ${userId}`
                });
            }
        }

        const updatedCheck = await requirementCheckService.updateRequirementCheck(id, {
            isChecked,
            companyId,
            requirementId,
            userId
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
