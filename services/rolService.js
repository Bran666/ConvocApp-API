const db = require("../models");

const getAllrol = async () => {
  try {
    const rol = await dbrol.findAll();
    return rol;
  } catch (error) {
    throw new Error("Error al obtener los usuarios" + error);
  }
};

const getrolById = async (id) => {
  try {
    const rol = await db.rolol.findByPk(id);
    return rol;
  } catch (error) {
    throw new Error("Error al obtener el usuario" + error);
  }
};

const createrol = async (nombre, email, password) => {
  try {
    const newUser = await db.rol.create({ nombre, email, password });
    return newUser;
  } catch (error) {
    throw new Error("Error al crear el usuario" + error);
  }
};

const updaterol = async (id, nombre) => {
  try {
    const rol = await db.r.findByPk(id);
    rol.nombre = nombre;
    await rol.save();
    return rol;
  } catch (error) {
    throw new Error("Error al actualizar el usuario" + error);
  }
};

const deleterol = async (id) => {
  try {
    const rol = await db.rol.findByPk(id);
    await rol.destroy();
    return rol;
  } catch (error) {
    throw new Error("Error al eliminar el usuario" + error);
  }
};

module.exports = {
  getAllrol,
  getrolById,
  createrol,
  updaterol,
  deleterol
};
