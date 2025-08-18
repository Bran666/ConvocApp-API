const { UserInterest } = require("../models");

// Obtener todos los registros
const getAllUserInterests = async () => {
    return UserInterest.findAll({ include: ["user", "interest"] });
};

// Obtener un registro por userId + interestId
const getUserInterestById = async (userId, interestId) => {
    return UserInterest.findOne({
        where: { userId, interestId },
        include: ["user", "interest"]
    });
};

// Crear un nuevo registro
const createUserInterest = async (data) => {
    const newRecord = await UserInterest.create(data);
    return UserInterest.findOne({
        where: { userId: newRecord.userId, interestId: newRecord.interestId },
        include: ["user", "interest"]
    });
};

// Actualizar un registro
const updateUserInterest = async (userId, interestId, data) => {
    const [updated] = await UserInterest.update(data, {
        where: { userId, interestId }
    });
    if (!updated) return null;

    // Si no mandaron nuevos IDs, seguimos con los originales
    const finalUserId = data.userId || userId;
    const finalInterestId = data.interestId || interestId;

    return UserInterest.findOne({
        where: { userId: finalUserId, interestId: finalInterestId },
        include: ["user", "interest"]
    });
};


// Eliminar un registro
const deleteUserInterest = async (userId, interestId) => {
    const deleted = await UserInterest.destroy({ where: { userId, interestId } });
    return deleted > 0;
};

module.exports = {
    getAllUserInterests,
    getUserInterestById,
    createUserInterest,
    updateUserInterest,
    deleteUserInterest
};
