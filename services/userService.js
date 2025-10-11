// 📁 services/userService.js
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

// ============================================================
// 🔹 Crear usuario (agregado campo imgUser)
// ============================================================
const createUser = async (name, email, password, phone, is_active, role_id, imgUser) => {
  try {
    const newUser = await db.User.create({
      name,
      email,
      password,
      phone,
      is_active,
      role_id,
      imgUser // 📸 nuevo campo imagen
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

// ============================================================
// 🔹 Actualizar usuario (agregado campo imgUser)
// ============================================================
const updateUser = async (id, name, email, password, phone, is_active, role_id, imgUser) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return null; // El controlador se encargará del 404
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.is_active = is_active;
    user.role_id = role_id;
    user.imgUser = imgUser; // 📸 actualizar campo imagen

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error.message);
  }
};

// ============================================================
// 🔹 Eliminar usuario
// ============================================================
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
