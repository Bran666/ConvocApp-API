const db = require("../models");

const getAllLineas = async () => {
  try {
    const lineas = await db.Linea.findAll();
    return lineas;
  } catch (error) {
    throw new Error("Error al obtener las lineas: " + error);
  }
};

const getLineaById = async (id) => {
  try {
    const linea = await db.Linea.findByPk(id);
    return linea;
  } catch (error) {
    throw new Error("Error al obtener la linea: " + error);
  }
};

const createLinea = async (nombre, descripcion) => {
  try {
    const newLinea = await db.Linea.create({ nombre, descripcion });
    return newLinea;
  } catch (error) {
    throw new Error("Error al crear la linea: " + error);
  }
};

const updateLinea = async (id, nombre, descripcion) => {
  try {
    const linea = await db.Linea.findByPk(id);
    linea.nombre = nombre;
    linea.descripcion = descripcion;
    await linea.save();
    return linea;
  } catch (error) {
    throw new Error("Error al actualizar la linea: " + error);
  }
};

const deleteLinea = async (id) => {
  try {
    const linea = await db.Linea.findByPk(id);
    await linea.destroy();
    return linea;
  } catch (error) {
    throw new Error("Error al eliminar la linea: " + error);
  }
};

module.exports = {
  getAllLineas,
  getLineaById,
  createLinea,
  updateLinea,
  deleteLinea
};
