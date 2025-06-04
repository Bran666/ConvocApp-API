const db = require("../models");

const getAllUsers = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error al obtener los usuarios" + error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario" + error);
  }
};

const createUser = async (name, email, password) => {
  try {
    const newUser = await db.User.create({ name, email, password });
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

const deleteUser = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    await user.destroy();
    return user;
  } catch (error) {
    throw new Error("Error al eliminar el usuario" + error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
