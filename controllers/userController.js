// Enlazamos el servicio (capa) de usuario
const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontraron usuarios"
      });
    }
    res.status(200).json({ status: "Ok", data: allUsers });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido"
      });
    }

    const oneUser = await userService.getUserById(id);
    if (!oneUser) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró el usuario con ID ${id}`
      });
    }

    res.status(200).json({ status: "Ok", data: oneUser });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, is_active, role_id } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Faltan campos obligatorios: name, email, password"
      });
    }

    const newUser = await userService.createUser(
      name,
      email,
      password,
      phone,
      is_active,
      role_id
    );

    res.status(201).json({ status: "Ok", data: newUser });
} catch (error) {
  console.error("Error en createUser:", error); // 👈 queda registrado en consola

  if (error.name === "SequelizeUniqueConstraintError") {
    const campoDuplicado = error.errors?.[0]?.path;
    let mensaje = "Ya existe un registro con este valor único.";
    if (campoDuplicado === "email") mensaje = "Ya existe un usuario con ese email.";
    if (campoDuplicado === "id") mensaje = "El ID ya está en uso. Verifica la secuencia.";
    return res.status(400).json({ status: "Error", message: mensaje });
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      status: "Error",
      message: "El role_id proporcionado no existe en la tabla roles."
    });
  }

  // Si no fue un error conocido, devolver mensaje más claro
  return res.status(500).json({
    status: "Error",
    message: error.message || "Ocurrió un error inesperado al crear el usuario."
  });
}

};


const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido"
      });
    }

    const { name, email, password, phone, is_active, role_id } = req.body;

    const updatedUser = await userService.updateUser(
      id,
      name,
      email,
      password,
      phone,
      is_active,
      role_id
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró el usuario con ID ${id}`
      });
    }

    res.status(200).json({ status: "Ok", data: updatedUser });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        status: "Error",
        message: "Ya existe un usuario con ese email"
      });
    }
    res.status(500).json({ status: "Error", message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido"
      });
    }

    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró el usuario con ID ${id}`
      });
    }

    res.status(200).json({
      status: "Ok",
      message: "Usuario eliminado correctamente"
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        status: "Error",
        message:
          "No se puede eliminar el usuario porque tiene registros asociados (ej: favoritos, convocatorias)"
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
  deleteUser
};
