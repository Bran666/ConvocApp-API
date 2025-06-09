const rolService = require("../services/rolService.js");

const getAllrol = async (req, res) => {
  const allrol = await rolService.getAllrol();
  if (allrol) {
    res.status(200).send({ status: "Ok", data: allrol });
  } else {
    res.status(400).send({ status: "Error", message: null });
  }
};

const getrolById = async (req, res) => {
  const id = req.params.id;
  const oneRol = await rolService.getrolById(id);
  if (oneRol) {
    res.status(200).send({ status: "Ok", data: oneRol });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const createrol = async (req, res) => {
  const { nombre } = req.body;
  const newRol = await rolService.createrol(nombre);

  if (newRol) {
    res.status(200).send({ status: "Ok", data: newRol });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const updaterol = async (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  const updatedRol = await rolService.updaterol(id, nombre);
  if (updatedRol) {
    res.status(200).send({ status: "Ok", data: updatedRol });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const deleterol = async (req, res) => {
  const id = req.params.id;
  const deletedRol = await rolService.deleterol(id);
  if (deletedRol) {
    res.status(200).send({ status: "Ok", data: deletedRol });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

module.exports = {
  getAllrol,
  getrolById,
  createrol,
  updaterol,
  deleterol,
};
