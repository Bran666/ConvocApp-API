const db = require("../models");

// Obtener todos los requisitos de selección
const getAllRequisitosSeleccion = async (req, res) => {
  try {
    const requisitos = await db.RequisitoSeleccion.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.status(200).json(requisitos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los requisitos de selección", error });
  }
};

// Obtener requisito de selección por ID
const getRequisitosSeleccionById = async (req, res) => {
  try {
    const id = req.params.id;
    const requisito = await db.RequisitoSeleccion.findByPk(id);
    if (!requisito) {
      return res.status(404).json({ message: "Requisito no encontrado" });
    }
    res.status(200).json(requisito);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el requisito", error });
  }
};

// Crear nuevo requisito de selección
const createRequisitosSeleccion = async (req, res) => {
  try {
    const nuevoRequisito = await db.RequisitoSeleccion.create({
      nombre: req.body.nombre,
      idTipo: req.body.idTipo
    });
    res.status(201).json(nuevoRequisito);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el requisito de selección", error });
  }
};

// Actualizar requisito de selección
const updateRequisitosSeleccion = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.RequisitoSeleccion.update(req.body, {
      where: { id: id }
    });
    if (!updated) {
      return res.status(404).json({ message: "Requisito no encontrado" });
    }
    const requisitoActualizado = await db.RequisitoSeleccion.findByPk(id);
    res.status(200).json(requisitoActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el requisito", error });
  }
};

// Eliminar requisito de selección
const deleteRequisitosSeleccion = async (req, res) => {
  const { id } = req.params;
  try {
    const requisito = await db.RequisitoSeleccion.findByPk(id);
    if (!requisito) {
      return res.status(404).json({ message: "Requisito no encontrado" });
    }
    await requisito.destroy();
    res.status(200).json({ message: "Requisito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el requisito", error });
  }
};

module.exports = {
  getAllRequisitosSeleccion,
  getRequisitosSeleccionById,
  createRequisitosSeleccion,
  updateRequisitosSeleccion,
  deleteRequisitosSeleccion
};
