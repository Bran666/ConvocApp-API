const db = require("../models");

const getAllCallAdditionalInterests = async () => {
  try {
    const records = await db.CallAdditionalInterest.findAll({
      include: [
        { model: db.Call, as: "call" },
        { model: db.Interest, as: "interest" },
      ],
    });
    return records;
  } catch (error) {
    throw new Error("Error al obtener los registros: " + error.message);
  }
};

const getCallAdditionalInterestById = async (callId, interestId) => {
  try {
    const record = await db.CallAdditionalInterest.findOne({
      where: { callId, interestId },
      include: [
        { model: db.Call, as: "call" },
        { model: db.Interest, as: "interest" },
      ],
    });
    if (!record) {
      throw new Error("Relación no encontrada");
    }
    return record;
  } catch (error) {
    throw new Error("Error al obtener la relación: " + error.message);
  }
};

const createCallAdditionalInterest = async (callId, interestId) => {
  try {
    // Validamos existencia de las FK
    const callExists = await db.Call.findByPk(callId);
    if (!callExists) throw new Error("La convocatoria especificada no existe");

    const interestExists = await db.Interest.findByPk(interestId);
    if (!interestExists) throw new Error("El interés especificado no existe");

    // 🔎 Validar si la relación ya existe
    const existing = await db.CallAdditionalInterest.findOne({
      where: { callId, interestId },
    });

    if (existing) {
      throw new Error("La relación ya está creada");
    }

    // Crear la relación
    const newRecord = await db.CallAdditionalInterest.create({ callId, interestId });

    return {
      status: "Success",
      message: "Relación creada correctamente",
      data: newRecord,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCallAdditionalInterest = async (callId, interestId, { newCallId, newInterestId }) => {
  try {
    // Buscar la relación actual
    const record = await db.CallAdditionalInterest.findOne({
      where: { callId, interestId },
    });
    if (!record) {
      throw new Error("Relación no encontrada");
    }

    // Validar que existan las nuevas FKs
    const callExists = await db.Call.findByPk(newCallId);
    if (!callExists) throw new Error("La nueva convocatoria no existe");

    const interestExists = await db.Interest.findByPk(newInterestId);
    if (!interestExists) throw new Error("El nuevo interés no existe");

    // Validar si ya existe la nueva combinación (para evitar duplicados)
    const existing = await db.CallAdditionalInterest.findOne({
      where: { callId: newCallId, interestId: newInterestId },
    });
    if (existing) {
      throw new Error("La relación ya está creada con esos IDs");
    }

    // Actualizar la relación
    await record.update({
      callId: newCallId,
      interestId: newInterestId,
    });

    return {
      status: "Success",
      message: "Relación actualizada correctamente",
      data: record,
    };
  } catch (error) {
    throw new Error("Error al actualizar la relación: " + error.message);
  }
};


const deleteCallAdditionalInterest = async (callId, interestId) => {
  try {
    const record = await db.CallAdditionalInterest.findOne({
      where: { callId, interestId },
    });
    if (!record) {
      throw new Error("Relación no encontrada");
    }
    await record.destroy();
    return {
      status: "Success",
      message: "Relación eliminada correctamente",
      data: record,
    };
  } catch (error) {
    throw new Error("Error al eliminar la relación: " + error.message);
  }
};

module.exports = {
  getAllCallAdditionalInterests,
  getCallAdditionalInterestById,
  createCallAdditionalInterest,
  deleteCallAdditionalInterest,
  updateCallAdditionalInterest,
};
