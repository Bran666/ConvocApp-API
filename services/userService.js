const db = require("../models");

const getAllUsers = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error.message);
  }
};

const createUser = async (name, email, password, phone, isActive, roleId) => {
  try {
    const newUser = await db.User.create({
      name,
      email,
      password,
      phone,
      isActive,
      roleId,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, name, email, password, phone, isActive, roleId) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return null; // El controlador se encargará del 404
    }

    // Actualizar solo los campos que se proporcionan
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = password ?? user.password;
    user.phone = phone ?? user.phone;
    user.isActive = isActive ?? user.isActive;
    user.roleId = roleId ?? user.roleId;

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return null; // El controlador se encargará del 404
    }

    await user.destroy();
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new Error(
        "No se puede eliminar el usuario porque está asociado a otros registros."
      );
    }
    throw new Error("Error al eliminar el usuario: " + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
