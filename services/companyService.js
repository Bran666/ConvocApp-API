// 📁 services/companyService.js
const { Company, City } = require("../models");

// ============================================================
// 🔹 Obtener todas las compañías
// ============================================================
const getAllCompanies = async ({ includeCity = false } = {}) => {
  const options = {};
  if (includeCity) {
    options.include = [
      {
        model: City,
        as: "city",
      },
    ];
  }
  return Company.findAll(options);
};

// ============================================================
// 🔹 Obtener una compañía por ID
// ============================================================
const getCompanyById = async (id, { includeCity = false } = {}) => {
  const options = { where: { id } };
  if (includeCity) {
    options.include = [
      {
        model: City,
        as: "city",
      },
    ];
  }
  return Company.findOne(options);
};

// ============================================================
// 🔹 Crear compañía (sin validaciones obligatorias)
// ============================================================
const createCompany = async (data) => {
  return Company.create(data);
};

// ============================================================
// 🔹 Actualizar compañía
// ============================================================
const updateCompany = async (id, data) => {
  const [updated] = await Company.update(data, { where: { id } });
  if (!updated) return null;
  return Company.findByPk(id);
};

// ============================================================
// 🔹 Eliminar compañía
// ============================================================
const deleteCompany = async (id) => {
  const deleted = await Company.destroy({ where: { id } });
  return deleted > 0;
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
