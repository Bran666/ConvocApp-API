// Enlazamos el servicio (capa) de convocatorias
const callService = require("../services/callService");

const getAllCalls = async (req, res) => {
  try {
    const allCalls = await callService.getAllCalls();
    if (!allCalls || allCalls.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontraron convocatorias"
      });
    }
    res.status(200).json({ status: "Ok", data: allCalls });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error al obtener las convocatorias: " + error.message
    });
  }
};

const getCallById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido"
      });
    }

    const call = await callService.getCallById(id);
    if (!call) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró la convocatoria con ID ${id}`
      });
    }

    res.status(200).json({ status: "Ok", data: call });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error al obtener la convocatoria: " + error.message
    });
  }
};

const createCall = async (req, res) => {
  try {
    const {
      title,
      description,
      resources,
      callLink,
      openDate,
      closeDate,
      pageName,
      pageUrl,
      objective,
      notes,
      institutionId,
      lineId,
      targetAudienceId,
      interestId,
      userId,
      clickCount
    } = req.body;

    // si viene archivo de imagen
    let imageUrl = req.body.imageUrl || null;
    if (req.file) {
      // ⚡ aquí decides si guardas en disco o BD
      imageUrl = `/uploads/${req.file.originalname}`;
    }

    if (!title || !lineId || !institutionId) {
      return res.status(400).json({
        status: "Error",
        message: "Faltan campos obligatorios: title, lineId, institutionId"
      });
    }

    const newCall = await callService.createCall(
      title,
      description || null,
      resources || null,
      callLink || null,
      openDate || null,
      closeDate || null,
      pageName || null,
      pageUrl || null,
      objective || null,
      notes || null,
      imageUrl,
      institutionId,
      lineId,
      targetAudienceId || null,
      interestId || null,
      userId || null,
      clickCount || 0
    );

    res.status(201).json(newCall);

  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message
    });
  }
};

const updateCall = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido"
      });
    }

    const {
      title,
      description,
      resources,
      callLink,
      openDate,
      closeDate,
      pageName,
      pageUrl,
      objective,
      notes,
      institutionId,
      lineId,
      targetAudienceId,
      interestId,
      userId,
      clickCount
    } = req.body;

    let imageUrl = req.body.imageUrl || null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.originalname}`;
    }

    const updatedCall = await callService.updateCall(
      id,
      title,
      description || null,
      resources || null,
      callLink || null,
      openDate || null,
      closeDate || null,
      pageName || null,
      pageUrl || null,
      objective || null,
      notes || null,
      imageUrl,
      institutionId || null,
      lineId || null,
      targetAudienceId || null,
      interestId || null,
      userId || null,
      clickCount || 0
    );

    if (!updatedCall) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró la convocatoria con ID ${id}`
      });
    }

    res.status(200).json({
      status: "Ok",
      message: "Convocatoria actualizada correctamente",
      data: updatedCall
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error al actualizar la convocatoria: " + error.message
    });
  }
};

const deleteCall = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: "Error",
        message: "El ID debe ser un número válido"
      });
    }

    const deletedCall = await callService.deleteCall(id);
    if (!deletedCall) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontró la convocatoria con ID ${id}`
      });
    }

    res.status(200).json({
      status: "Ok",
      message: "Convocatoria eliminada correctamente"
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        status: "Error",
        message: "No se puede eliminar la convocatoria porque está asociada a otros registros (ej: favoritos)"
      });
    }
    res.status(500).json({
      status: "Error",
      message: "Error al eliminar la convocatoria: " + error.message
    });
  }
};

module.exports = {
  getAllCalls,
  getCallById,
  createCall,
  updateCall,
  deleteCall,
};
