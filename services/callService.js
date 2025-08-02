const db = require("../models");

const getAllCalls = async () => {
    try {
        const calls = await db.Call.findAll();
        return calls;
    } catch (error) {
        throw new Error("Mistake getting all Calls" + error);
    }
};

const getCallById = async (id) => {
  try {
    const user = await db.Call.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario" + error);
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
  clickCount) => {
  try {
    const newCall = await db.Call.create({   title,
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
  clickCount});
    return newCall;
  } catch (error) {
    throw new Error("Mistake creatting a call" + error);
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
    return call;
  } catch (error) {
    throw new Error("Error al actualizar la convocatoria: " + error.message);
  }
};


const deleteCall = async (id) => {
  try {
    const call = await db.Call.findByPk(id);
    await call.destroy();
    return call;
  } catch (error) {
    throw new Error("Error al eliminar el usuario" + error);
  }
};

module.exports = {
  getAllCalls,
  getCallById,
  createCall,
  updateCall,
  deleteCall
};
