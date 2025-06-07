const db = require("../models");

// Obtener todos los tipos
const getAllTipos = async (req, res) => {
  try {
    const tipos = await db.Tipo.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.status(200).json({ status: "OK", data: tipos });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Obtener tipo por ID
const getTipoById = async (req, res) => {
  try {
    const id = req.params.id;
    const tipo = await db.Tipo.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ status: "FAILED", data: { error: "Tipo no encontrado" } });
    }
    res.status(200).json({ status: "OK", data: tipo });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Crear nuevo tipo
const createTipo = async (req, res) => {
  try {
    const nuevoTipo = await db.Tipo.create(req.body);
    res.status(201).json({ status: "OK", data: nuevoTipo });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Actualizar tipo
const updateTipo = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Tipo.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ status: "FAILED", data: { error: "Tipo no encontrado" } });
    }
    const tipoActualizado = await db.Tipo.findByPk(id);
    res.status(200).json({ status: "OK", data: tipoActualizado });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error: error.message } });
  }
};

// Eliminar tipo
const deleteTipo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.Tipo.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ status: "FAILED", data: { error: "Tipo no encontrado" } });
    }
    res.status(200).json({ status: "OK", data: "Tipo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error: error.message } });
  }
};

module.exports = {
  getAllTipos,
  getTipoById,
  createTipo,
  updateTipo,
  deleteTipo,
};
