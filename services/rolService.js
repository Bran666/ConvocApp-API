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
    const rol = await db.rol.findByPk(id);
    return rol;
  } catch (error) {
    throw new Error("Error al obtener el usuario" + error);
  }
};

const createrol = async (name, email, password) => {
  try {
    const newUser = await db.rol.create({ name, email, password });
    return newUser;
  } catch (error) {
    throw new Error("Error al crear el usuario" + error);
  }
};

const updateUser = async (id, name, email, password) => {
  try {
    const user = await db.User.findByPk(id);
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
    return user;
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
  getAllUrol,
  getrolById,
  createrol,
  updaterol,
  deleterol
};
