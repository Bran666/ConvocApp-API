
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
// ============================================================
// 🔹 Actualizar usuario (con validaciones seguras)
// ============================================================
const updateUser = async (id, name, email, password, phone, isActive, roleId, imgUser) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return null; // El controlador se encargará del 404
    }

    // ✅ Solo actualizamos los campos si vienen en el body
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (typeof isActive === "boolean") user.isActive = isActive;
    if (imgUser) user.imgUser = imgUser;

    // 🔐 Solo si el usuario envió una nueva contraseña
    if (password && password.trim() !== "") {
      user.password = password;
    }

    // 👇 Solo si el rol fue proporcionado (evita null)
    if (roleId !== undefined && roleId !== null) {
      user.roleId = roleId;
    }

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
