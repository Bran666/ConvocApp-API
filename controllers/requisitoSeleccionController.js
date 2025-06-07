const db = require("../models");

// Obtener todos los requisitos de selección
const getAllRequisitosSeleccion = async (req, res) => {
  try {
    const requisitos = await db.RequisitoSeleccion.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.status(200).json({ status: "OK", data: requisitos });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Obtener requisito de selección por ID
const getRequisitoSeleccionById = async (req, res) => {
  try {
    const id = req.params.id;
    const requisito = await db.RequisitoSeleccion.findByPk(id);
    if (!requisito) {
      return res.status(404).json({ status: "FAILED", data: { error: "Requisito no encontrado" } });
    }
    res.status(200).json({ status: "OK", data: requisito });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Crear nuevo requisito de selección
const createRequisitoSeleccion = async (req, res) => {
  try {
    const nuevoRequisito = await db.RequisitoSeleccion.create(req.body);
    res.status(201).json({ status: "OK", data: nuevoRequisito });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Actualizar requisito de selección
const updateRequisitoSeleccion = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.RequisitoSeleccion.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ status: "FAILED", data: { error: "Requisito no encontrado" } });
    }
    const requisitoActualizado = await db.RequisitoSeleccion.findByPk(id);
    res.status(200).json({ status: "OK", data: requisitoActualizado });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Eliminar requisito de selección
const deleteRequisitoSeleccion = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.RequisitoSeleccion.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ status: "FAILED", data: { error: "Requisito no encontrado" } });
    }
    res.status(200).json({ status: "OK", data: "Requisito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

module.exports = {
  getAllRequisitosSeleccion,
  getRequisitoSeleccionById,
  createRequisitoSeleccion,
  updateRequisitoSeleccion,
  deleteRequisitoSeleccion,
};
