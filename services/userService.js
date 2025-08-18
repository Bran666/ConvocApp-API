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
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error.message);
  }
};

const createUser = async (name, email, password, phone, is_active, role_id) => {
  try {
    const newUser = await db.User.create({
      name,
      email,
      password,
      phone,
      is_active,
      role_id
    });
    return newUser;
  } catch (error) {
    throw error; // 👈 no lo tapes con un Error nuevo, así se conserva error.name
  }
};


const updateUser = async (id, name, email, password, phone, is_active, role_id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.is_active = is_active;
    user.role_id = role_id;

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
      throw new Error("Usuario no encontrado");
    }

    await user.destroy();
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    // Manejo especial de restricciones de FK (si el usuario está relacionado con otras tablas)
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new Error("No se puede eliminar el usuario porque está asociado a otros registros.");
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
