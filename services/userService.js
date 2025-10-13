
const db = require("../models");

// ============================================================
// 🔹 Obtener todos los usuarios
// ============================================================
const getAllUsers = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  }
};

// ============================================================
// 🔹 Obtener usuario por ID
// ============================================================
const getUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error.message);
  }
};

// ============================================================
// 🔹 Crear usuario (incluye campo imgUser)
// ============================================================
const createUser = async (name, email, password, phone, isActive, roleId, imgUser) => {
  try {
    const newUser = await db.User.create({
      name,
      email,
      password,
      phone,
      isActive, 
      roleId,   
      imgUser  
    });
    return newUser;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
};

// ============================================================
// 🔹 Actualizar usuario (incluye campo imgUser)
// ============================================================
const updateUser = async (id, name, email, password, phone, isActive, roleId, imgUser) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return null; // El controlador se encargará del 404
    }

    // ✅ Actualización de campos alineada con BD
    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.isActive = isActive;
    user.roleId = roleId;
    user.imgUser = imgUser; 

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
  deleteUser
};
