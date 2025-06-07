const db = require("../models");

// Obtener todas las empresas
const getAllEmpresas = async (req, res) => {
  try {
    const empresas = await db.Empresa.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.status(200).json({ status: "OK", data: empresas });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Obtener empresa por ID
const getEmpresasById = async (req, res) => {
  try {
    const id = req.params.id;
    const empresa = await db.Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ status: "FAILED", data: { error: "Empresa no encontrada" } });
    }
    res.status(200).json({ status: "OK", data: empresa });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Crear nueva empresa
const createEmpresas = async (req, res) => {
  try {
    const nuevaEmpresa = await db.Empresa.create(req.body);
    res.status(201).json({ status: "OK", data: nuevaEmpresa });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Actualizar empresa
const updateEmpresas = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Empresa.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ status: "FAILED", data: { error: "Empresa no encontrada" } });
    }
    const empresaActualizada = await db.Empresa.findByPk(id);
    res.status(200).json({ status: "OK", data: empresaActualizada });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Eliminar empresa
const deleteEmpresas = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.Empresa.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ status: "FAILED", data: { error: "Empresa no encontrada" } });
    }
    res.status(200).json({ status: "OK", data: "Empresa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

module.exports = {
  getAllEmpresas,
  getEmpresasById,
  createEmpresas,
  updateEmpresas,
  deleteEmpresas,
};
