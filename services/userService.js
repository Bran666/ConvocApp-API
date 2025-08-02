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

const createUser = async (name, email, password, phone, is_active, role_id) => {
  try {
    const newUser = await db.User.create({ name, email, password, phone, is_active, role_id });
    return newUser;
  } catch (error) {
    throw new Error("Error al crear el usuario" + error);
  }
};

const updateUser = async (id, name, email, password, phone, is_active, role_id) => {
  try {
    const user = await db.User.findByPk(id);
    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.is_active = is_active;
    user.role_id = role_id;
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
