// Enlazamos el servicio (capa) de user_interests
const userInterestService = require("../services/userInterestService");
const { User, Interest } = require("../models"); // ✅ Importamos para validar existencia

const getAllUserInterests = async (req, res) => {
    try {
        const allUserInterests = await userInterestService.getAllUserInterests();
        if (!allUserInterests || allUserInterests.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron intereses de usuario"
            });
        }
        res.status(200).json({ status: "Ok", data: allUserInterests });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getUserInterestById = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const interestId = parseInt(req.params.interestId, 10);

        if (isNaN(userId) || isNaN(interestId)) {
            return res.status(400).json({
                status: "Error",
                message: "userId e interestId deben ser números válidos"
            });
        }

        const userInterest = await userInterestService.getUserInterestById(userId, interestId);
        if (!userInterest) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el registro con userId=${userId} e interestId=${interestId}`
            });
        }
        res.status(200).json({ status: "Ok", data: userInterest });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createUserInterest = async (req, res) => {
    try {
        const { userId, interestId } = req.body;

        if (!userId || !interestId) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: userId, interestId"
            });
        }

        // ✅ Validar existencia de user
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(400).json({
                status: "Error",
                message: `El usuario con id=${userId} no existe`
            });
        }

        // ✅ Validar existencia de interest
        const interestExists = await Interest.findByPk(interestId);
        if (!interestExists) {
            return res.status(400).json({
                status: "Error",
                message: `El interés con id=${interestId} no existe`
            });
        }

        // ✅ Verificar si ya existe la relación antes de insertar
        const exists = await userInterestService.getUserInterestById(userId, interestId);
        if (exists) {
            return res.status(409).json({
                status: "Error",
                message: `El usuario con id=${userId} ya tiene asignado el interés con id=${interestId}`
            });
        }

        const newUserInterest = await userInterestService.createUserInterest({ userId, interestId });
        res.status(201).json({ status: "Ok", data: newUserInterest });
    } catch (error) {
        // Manejo de error por duplicidad de PK (en caso de que no se haya validado antes)
        if (error.message.includes("llave duplicada") || error.message.includes("duplicate key")) {
            return res.status(409).json({
                status: "Error",
                message: "El usuario ya tiene asignado este interés"
            });
        }

        res.status(500).json({ status: "Error", message: error.message });
    }
};


const updateUserInterest = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const interestId = parseInt(req.params.interestId, 10);

        if (isNaN(userId) || isNaN(interestId)) {
            return res.status(400).json({
                status: "Error",
                message: "userId e interestId deben ser números válidos"
            });
        }

        // Validar si el registro existe antes de actualizar
        const existingRelation = await userInterestService.getUserInterestById(userId, interestId);
        if (!existingRelation) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el registro con userId=${userId} e interestId=${interestId}`
            });
        }

        // Validar nuevo userId si lo envían
        let newUserId = userId;
        if (req.body.userId) {
            const newUserExists = await User.findByPk(req.body.userId);
            if (!newUserExists) {
                return res.status(400).json({
                    status: "Error",
                    message: `El usuario con id=${req.body.userId} no existe`
                });
            }
            newUserId = req.body.userId;
        }

        // Validar nuevo interestId si lo envían
        let newInterestId = interestId;
        if (req.body.interestId) {
            const newInterestExists = await Interest.findByPk(req.body.interestId);
            if (!newInterestExists) {
                return res.status(400).json({
                    status: "Error",
                    message: `El interés con id=${req.body.interestId} no existe`
                });
            }
            newInterestId = req.body.interestId;
        }

        // 🚨 Validar que la nueva combinación no esté duplicada
        const duplicate = await userInterestService.getUserInterestById(newUserId, newInterestId);
        if (duplicate && (newUserId !== userId || newInterestId !== interestId)) {
            return res.status(409).json({
                status: "Error",
                message: `El usuario con id=${newUserId} ya tiene asignado el interés con id=${newInterestId}`
            });
        }

        // ✅ Actualizamos (usamos los IDs originales en el WHERE, pero devolvemos con los nuevos IDs)
        await userInterestService.updateUserInterest(userId, interestId, req.body);

        // ✅ Recuperar el registro actualizado con los nuevos IDs
        const updatedUserInterest = await userInterestService.getUserInterestById(newUserId, newInterestId);

        res.status(200).json({ status: "Ok", data: updatedUserInterest });
    } catch (error) {
        // Captura específica de duplicados
        if (error.message.includes("llave duplicada") || error.message.includes("duplicate key")) {
            return res.status(409).json({
                status: "Error",
                message: "No se pudo actualizar: el usuario ya tiene asignado ese interés"
            });
        }

        // Captura específica de FK inválidas
        if (error.message.includes("llave foránea")) {
            return res.status(400).json({
                status: "Error",
                message: "No se pudo actualizar: el userId o interestId no existe en sus tablas relacionadas"
            });
        }

        res.status(500).json({ status: "Error", message: error.message });
    }
};


const deleteUserInterest = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const interestId = parseInt(req.params.interestId, 10);

        if (isNaN(userId) || isNaN(interestId)) {
            return res.status(400).json({
                status: "Error",
                message: "userId e interestId deben ser números válidos"
            });
        }

        const deletedUserInterest = await userInterestService.deleteUserInterest(userId, interestId);
        if (!deletedUserInterest) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el registro con userId=${userId} e interestId=${interestId}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Relación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllUserInterests,
    getUserInterestById,
    createUserInterest,
    updateUserInterest,
    deleteUserInterest,
};
