// Enlazamos el servicio (capa) de público objetivo
const publicoObjetivoService = require("../services/publicoObjetivoService");

// Obtener todos los públicos objetivo
const getAllPublicos = async (req, res) => {
  const allPublicos = await publicoObjetivoService.getAllPublicos();
  if (allPublicos) {
    res.status(200).send({ status: "Ok", data: allPublicos });
  } else {
    res.status(400).send({ status: "Error", message: null });
  }
};

// Obtener un público objetivo por ID
const getPublicoById = async (req, res) => {
  const id = req.params.id;
  const onePublico = await publicoObjetivoService.getPublicoById(id);
  if (onePublico) {
    res.status(200).send({ status: "Ok", data: onePublico });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

// Crear nuevo público objetivo
const createPublico = async (req, res) => {
  const { nombre } = req.body;
  const newPublico = await publicoObjetivoService.createPublico(nombre);

  if (newPublico) {
    res.status(200).send({ status: "Ok", data: newPublico });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

// Actualizar un público objetivo
const updatePublico = async (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  const updatedPublico = await publicoObjetivoService.updatePublico(id, nombre);
  if (updatedPublico) {
    res.status(200).send({ status: "Ok", data: updatedPublico });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

// Eliminar un público objetivo
const deletePublico = async (req, res) => {
  const id = req.params.id;
  const deletedPublico = await publicoObjetivoService.deletePublico(id);
  if (deletedPublico) {
    res.status(200).send({ status: "Ok", data: deletedPublico });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

module.exports = {
  getAllPublicos,
  getPublicoById,
  createPublico,
  updatePublico,
  deletePublico,
};
