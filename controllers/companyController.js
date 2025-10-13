// 📁 controllers/companyController.js
const companyService = require("../services/companyService");
const { City } = require("../models");

// ============================================================
// 🔹 Obtener todas las compañías
// ============================================================
const getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await companyService.getAllCompanies({ includeCity: true });

    if (!allCompanies || allCompanies.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontraron compañías",
      });
    }

    res.status(200).json({ status: "Ok", data: allCompanies });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// ============================================================
// 🔹 Obtener una compañía por ID
// ============================================================
const getCompanyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido",
      });
    }

    const company = await companyService.getCompanyById(id, { includeCity: true });
    if (!company) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró la compañía con ID ${id}`,
      });
    }

    res.status(200).json({ status: "Ok", data: company });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// ============================================================
// 🔹 Crear una nueva compañía (NINGÚN CAMPO OBLIGATORIO)
// ============================================================
const createCompany = async (req, res) => {
  try {
    const data = req.body || {};

    // ✅ Si cityId viene, validar que exista; si no viene, continuar normal
    if (data.cityId) {
      const cityExists = await City.findByPk(data.cityId);
      if (!cityExists) {
        return res.status(400).json({
          status: "Error",
          message: `No existe la ciudad con ID ${data.cityId}`,
        });
      }
    }

    // ✅ Crear la compañía (sin validaciones obligatorias)
    const newCompany = await companyService.createCompany(data);
    res.status(201).json({ status: "Ok", data: newCompany });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message || "Error al crear la compañía",
    });
  }
};

// ============================================================
// 🔹 Actualizar una compañía
// ============================================================
const updateCompany = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido",
      });
    }

    // ✅ Si cityId viene en el body, validar que exista
    if (req.body.cityId) {
      const cityExists = await City.findByPk(req.body.cityId);
      if (!cityExists) {
        return res.status(400).json({
          status: "Error",
          message: `No existe la ciudad con ID ${req.body.cityId}`,
        });
      }
    }

    const updatedCompany = await companyService.updateCompany(id, req.body);
    if (!updatedCompany) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró la compañía con ID ${id}`,
      });
    }

    res.status(200).json({ status: "Ok", data: updatedCompany });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message || "Error al actualizar compañía",
    });
  }
};

// ============================================================
// 🔹 Eliminar una compañía
// ============================================================
const deleteCompany = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido",
      });
    }

    const deletedCompany = await companyService.deleteCompany(id);
    if (!deletedCompany) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró la compañía con ID ${id}`,
      });
    }

    res.status(200).json({ status: "Ok", message: "Compañía eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message || "Error al eliminar compañía",
    });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
