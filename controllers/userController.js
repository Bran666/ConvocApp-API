// Enlazamos el servicio(capa) de usuario
const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsers();
  if (allUsers) {
    res.status(200).send({ status: "Ok", data: allUsers });
  } else {
    res.status(400).send({ status: "Error", message: null });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const oneUser = await userService.getUserById(id);
  if (oneUser) {
    res.status(200).send({ status: "Ok", data: oneUser });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, phone, is_active, role_id } = req.body;
  const newUser = await userService.createUser(name, email, password, phone, is_active, role_id);

  if (newUser) {
    res.status(200).send({ status: "Ok", data: newUser });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password, phone, is_active, role_id } = req.body;
  const updatedUser = await userService.updateUser(id, name, email, password, phone, is_active, role_id);
  if (updatedUser) {
    res.status(200).send({ status: "Ok", data: updatedUser });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const deletedUser = await userService.deleteUser(id);
  if (deletedUser) {
    res.status(200).send({ status: "Ok", data: deletedUser });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
