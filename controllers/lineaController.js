// Enlazamos el servicio(capa) de linea
const lineaService = require("../services/lineaService");

const getAllLineas = async (req, res) => {
  const allLineas = await lineaService.getAllLineas();
  if (allLineas) {
    res.status(200).send({ status: "Ok", data: allLineas });
  } else {
    res.status(400).send({ status: "Error", message: null });
  }
};

const getLineaById = async (req, res) => {
  const id = req.params.id;
  const oneLinea = await lineaService.getLineaById(id);
  if (oneLinea) {
    res.status(200).send({ status: "Ok", data: oneLinea });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const createLinea = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const newLinea = await lineaService.createLinea(nombre, descripcion);

  if (newLinea) {
    res.status(200).send({ status: "Ok", data: newLinea });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const updateLinea = async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion } = req.body;
  const updatedLinea = await lineaService.updateLinea(id, nombre, descripcion);
  if (updatedLinea) {
    res.status(200).send({ status: "Ok", data: updatedLinea });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const deleteLinea = async (req, res) => {
  const id = req.params.id;
  const deletedLinea = await lineaService.deleteLinea(id);
  if (deletedLinea) {
    res.status(200).send({ status: "Ok", data: deletedLinea });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

module.exports = {
  getAllLineas,
  getLineaById,
  createLinea,
  updateLinea,
  deleteLinea,
};
