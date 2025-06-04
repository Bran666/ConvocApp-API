const rolService = require("../services/rolService.js");

const getAllrol = async (req, res) => {
  const getAllrol = await rolService.getAllrol();
  if (getAllrol) {
    res.status(200).send({ status: "Ok", data: allrol });
  } else {
    res.status(400).send({ status: "Error", message: null });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const oneUser = await rolService.getrolById(id);
  if (oneUser) {
    res.status(200).send({ status: "Ok", data: oneUser });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const createrol = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userSerrol.createrol(name, email, password);

  if (newrol) {
    res.status(200).send({ status: "Ok", data: newUser });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const updaterol = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  const updatedrol = await userSerrol.updaterol(id, name, email, password);
  if (updatedrol) {
    res.status(200).send({ status: "Ok", data: updatedrol });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const deleterol = async (req, res) => {
  const id = req.params.id;
  const deleterol = await userSerrol.deleterol(id);
  if (deleterol) {
    res.status(200).send({ status: "Ok", data: deleterol });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

module.exports = {
  getAllUrol,
  getrolById,
  createrol,
  updaterol,
  deleterol,
};
