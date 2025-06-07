const db = require("../models");

// Obtener todos los tipos
const getAllTipos = async () => {
  try {
    const tipos = await db.Tipo.findAll();
    return tipos;
  } catch (error) {
    throw new Error("Error al obtener los tipos: " + error.message);
  }
};

// Obtener tipo por ID
const getTipoById = async (id) => {
  try {
    const tipo = await db.Tipo.findByPk(id);
    return tipo;
  } catch (error) {
    throw new Error("Error al obtener el tipo: " + error.message);
  }
};

// Crear nuevo tipo
const createTipo = async (nombre) => {
  try {
    const nuevoTipo = await db.Tipo.create({ nombre });
    return nuevoTipo;
  } catch (error) {
    throw new Error("Error al crear el tipo: " + error.message);
  }
};

// Actualizar tipo existente
const updateTipo = async (id, nombre) => {
  try {
    const tipo = await db.Tipo.findByPk(id);
    if (!tipo) throw new Error("Tipo no encontrado");
    tipo.nombre = nombre;
    await tipo.save();
    return tipo;
  } catch (error) {
    throw new Error("Error al actualizar el tipo: " + error.message);
  }
};

// Eliminar tipo
const deleteTipo = async (id) => {
  try {
    const tipo = await db.Tipo.findByPk(id);
    if (!tipo) throw new Error("Tipo no encontrado");
    await tipo.destroy();
    return tipo;
  } catch (error) {
    throw new Error("Error al eliminar el tipo: " + error.message);
  }
};

module.exports = {
  getAllTipos,
  getTipoById,
  createTipo,
  updateTipo,
  deleteTipo
};
