const db = require("../models");

// Obtener todas las empresas
const getAllEmpresas = async (req, res) => {
  try {
    const empresas = await db.Empresa.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las empresas", error });
  }
};
const getEmpresasById = async (req, res) => {
    try {
        const id = req.params.id;
        const empresa = await EmpresaService.getEmpresasById(id);
        res.status(200).send({ status: "OK", data: empresa });
    } catch (error) {
        const statusCode = error?.status || 500;
        const message = error?.message || "Error interno";
        res.status(statusCode).send({ status: "FAILED", data: { error: message } });
    }
};


// Crear nueva empresa
const createEmpresas = async (req, res) => {
  try {
    const nuevaEmpresa = await db.Empresa.create({
      nombre: req.body.nombre,
      nit: req.body.nit,
      razonSocial: req.body.razonSocial,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      paginaWeb: req.body.paginaWeb,
      numEmpleados: req.body.numEmpleados,
      sectorEconomico: req.body.sectorEconomico,
      descripcion: req.body.descripcion,
      tiempoExistencia: req.body.tiempoExistencia,
      documentoLegal: req.body.documentoLegal,
      nombreLegal: req.body.nombreLegal,
      apellidoLegal: req.body.apellidoLegal,
      telefonoFijo: req.body.telefonoFijo,
      celularLegal: req.body.celularLegal,
      email: req.body.email,
      cargoLegal: req.body.cargoLegal,
      fkIdCiudad: req.body.fkIdCiudad,
      idUsuario: req.body.idUsuario
    });
    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la empresa", error });
  }
};

// Actualizar empresa
const updateEmpresas = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Empresa.update(req.body, {
      where: { id: id }
    });
    if (!updated) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    const empresaActualizada = await db.Empresa.findByPk(id);
    res.status(200).json(empresaActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la empresa", error });
  }
};

// Eliminar empresa
const deleteEmpresas = async (req, res) => {
  const { id } = req.params;
  try {
    const empresa = await db.Empresa.destroy(id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    await empresa.destroy();
    res.status(200).json({ message: "Empresa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la empresa", error });
  }
};

module.exports = {
  getAllEmpresas,
  getEmpresasById,
  createEmpresas,
  updateEmpresas,
  deleteEmpresas
};
