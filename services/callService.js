const db = require("../models");

const getAllCalls = async () => {
  try {
    const calls = await db.Call.findAll();
    return calls;
  } catch (error) {
    throw new Error("Error al obtener todas las convocatorias: " + error.message);
  }
};

const getCallById = async (id) => {
  try {
    const call = await db.Call.findByPk(id);
    if (!call) {
      throw new Error("Convocatoria no encontrada");
    }
    return call;
  } catch (error) {
    throw new Error("Error al obtener la convocatoria: " + error.message);
  }
};

const createCall = async (
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
  imageUrl,
  institutionId,
  lineId,
  targetAudienceId,
  interestId,
  userId,
  clickCount
) => {
  try {
    // Validamos existencia de FK si vienen en el body
    if (userId) {
      const userExists = await db.User.findByPk(userId);
      if (!userExists) throw new Error("El usuario especificado no existe");
    }
    if (institutionId) {
      const instExists = await db.Institution.findByPk(institutionId);
      if (!instExists) throw new Error("La institución especificada no existe");
    }
    if (lineId) {
      const lineExists = await db.Line.findByPk(lineId);
      if (!lineExists) throw new Error("La línea especificada no existe");
    }
    if (targetAudienceId) {
      const taExists = await db.TargetAudience.findByPk(targetAudienceId);
      if (!taExists) throw new Error("El público objetivo especificado no existe");
    }
    if (interestId) {
      const intExists = await db.Interest.findByPk(interestId);
      if (!intExists) throw new Error("El interés especificado no existe");
    }

    // Si todas las validaciones pasan, se crea la convocatoria
    const newCall = await db.Call.create({
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
      imageUrl,
      institutionId,
      lineId,
      targetAudienceId,
      interestId,
      userId,
      clickCount,
    });

    return {
      status: "Success",
      message: "Convocatoria creada correctamente",
      data: newCall,
    };

  } catch (error) {
    throw new Error("Error al crear la convocatoria: " + error.message);
  }
};

const updateCall = async (
  id,
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
  imageUrl,
  institutionId,
  lineId,
  targetAudienceId,
  interestId,
  userId,
  clickCount
) => {
  try {
    const call = await db.Call.findByPk(id);
    if (!call) {
      throw new Error("Convocatoria no encontrada");
    }

    call.title = title;
    call.description = description;
    call.resources = resources;
    call.callLink = callLink;
    call.openDate = openDate;
    call.closeDate = closeDate;
    call.pageName = pageName;
    call.pageUrl = pageUrl;
    call.objective = objective;
    call.notes = notes;
    call.imageUrl = imageUrl;
    call.institutionId = institutionId;
    call.lineId = lineId;
    call.targetAudienceId = targetAudienceId;
    call.interestId = interestId;
    call.userId = userId;
    call.clickCount = clickCount;

    await call.save();
    return {
      status: "Success",
      message: "Convocatoria actualizada correctamente",
      data: call
    };
  } catch (error) {
    throw new Error("Error al actualizar la convocatoria: " + error.message);
  }
};

const deleteCall = async (id) => {
  try {
    const call = await db.Call.findByPk(id);
    if (!call) {
      throw new Error("Convocatoria no encontrada");
    }
    await call.destroy();
    return {
      status: "Success",
      message: "Convocatoria eliminada correctamente",
      data: call
    };
  } catch (error) {
    throw new Error("Error al eliminar la convocatoria: " + error.message);
  }
};

module.exports = {
  getAllCalls,
  getCallById,
  createCall,
  updateCall,
  deleteCall
};
