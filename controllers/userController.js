const userService = require("../services/userService");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

// ============================================================
// 🔹 Obtener todos los usuarios
// ============================================================
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontraron usuarios",
      });
    }
    res.status(200).json({ status: "Ok", data: allUsers });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// ============================================================
// 🔹 Obtener usuario por ID
// ============================================================
const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido",
      });
    }

    const oneUser = await userService.getUserById(id);
    if (!oneUser) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró el usuario con ID ${id}`,
      });
    }

    res.status(200).json({ status: "Ok", data: oneUser });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// ============================================================
// 🔹 Crear usuario (sin doble hash)
// ============================================================
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, isActive, roleId, imgUser } = req.body;

    // ✅ Validar campos obligatorios
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Faltan campos obligatorios: name, email, password",
      });
    }

    // ✅ Validar si el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "Error",
        message: "El correo ya está registrado. Intenta iniciar sesión o usa otro correo.",
      });
    }

    // 🚀 Crear usuario (el modelo se encarga del hash automáticamente)
    const rol = roleId ?? 2;
    const activo = isActive ?? true;

    const newUser = await userService.createUser(
      name,
      email,
      password, // ✅ sin hash manual
      phone,
      activo,
      rol,
      imgUser
    );

    res.status(201).json({ status: "Ok", data: newUser });
  } catch (error) {
    console.error("Error en createUser:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      const campoDuplicado = error.errors?.[0]?.path;
      let mensaje = "Ya existe un registro con este valor único.";
      if (campoDuplicado === "email")
        mensaje = "Ya existe un usuario con ese email.";
      if (campoDuplicado === "id")
        mensaje = "El ID ya está en uso. Verifica la secuencia.";
      return res.status(400).json({ status: "Error", message: mensaje });
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        status: "Error",
        message: "El roleId proporcionado no existe en la tabla Roles.",
      });
    }

    return res.status(500).json({
      status: "Error",
      message: error.message || "Ocurrió un error inesperado al crear el usuario.",
    });
  }
};

// ============================================================
// 🔹 Actualizar usuario (incluye imgUser y password opcional)
// ============================================================
const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido",
      });
    }

    const { name, email, password, phone, isActive, roleId, imgUser } = req.body;

    // ✅ Evitar duplicar email al actualizar
    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({
          status: "Error",
          message: "Ya existe un usuario con ese correo electrónico.",
        });
      }
    }

    const updatedUser = await userService.updateUser(
      id,
      name,
      email,
      password,
      phone,
      isActive,
      roleId,
      imgUser
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró el usuario con ID ${id}`,
      });
    }

    res.status(200).json({ status: "Ok", data: updatedUser });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        status: "Error",
        message: "Ya existe un usuario con ese email",
      });
    }
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// ============================================================
// 🔹 Eliminar usuario
// ============================================================
const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido",
      });
    }

    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró el usuario con ID ${id}`,
      });
    }

    res.status(200).json({
      status: "Ok",
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        status: "Error",
        message: "No se puede eliminar el usuario porque tiene registros asociados (ej: favoritos, convocatorias)",
      });
    }
    res.status(500).json({ status: "Error", message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
