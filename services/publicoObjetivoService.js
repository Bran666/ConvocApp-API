const db = require("../models");

// Obtener todos los públicos objetivo
const getAllPublicos = async () => {
  try {
    const publicos = await db.PublicoObjetivo.findAll();
    return publicos;
  } catch (error) {
    throw new Error("Error al obtener los públicos objetivo: " + error);
  }
};

// Obtener un público objetivo por su ID
const getPublicoById = async (id) => {
  try {
    const publico = await db.PublicoObjetivo.findByPk(id);
    return publico;
  } catch (error) {
    throw new Error("Error al obtener el público objetivo: " + error);
  }
};

// Crear nuevo público objetivo
const createPublico = async (nombre) => {
  try {
    const nuevoPublico = await db.PublicoObjetivo.create({ nombre });
    return nuevoPublico;
  } catch (error) {
    throw new Error("Error al crear el público objetivo: " + error);
  }
};

// Actualizar un público objetivo existente
const updatePublico = async (id, nombre) => {
  try {
    const publico = await db.PublicoObjetivo.findByPk(id);
    if (!publico) throw new Error("No se encontró el público objetivo con el ID proporcionado.");
    
    publico.nombre = nombre;
    await publico.save();
    return publico;
  } catch (error) {
    throw new Error("Error al actualizar el público objetivo: " + error);
  }
};

// Eliminar un público objetivo
const deletePublico = async (id) => {
  try {
    const publico = await db.PublicoObjetivo.findByPk(id);
    if (!publico) throw new Error("No se encontró el público objetivo con el ID proporcionado.");

    await publico.destroy();
    return publico;
  } catch (error) {
    throw new Error("Error al eliminar el público objetivo: " + error);
  }
};

module.exports = {
  getAllPublicos,
  getPublicoById,
  createPublico,
  updatePublico,
  deletePublico,
};
