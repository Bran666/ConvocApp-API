// Enlazamos el servicio (capa) de CallAdditionalInterest
const callAdditionalInterest = require("../services/callAdditionalInterestService");


const getAllCallAdditionalInterests = async (req, res) => {
    try {
        const allRecords = await callAdditionalInterest.getAllCallAdditionalInterests();
        if (!allRecords || allRecords.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron relaciones call-additional-interests"
            });
        }
        res.status(200).json({ status: "Ok", data: allRecords });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getCallAdditionalInterestById = async (req, res) => {
    try {
        const callId = parseInt(req.params.callId, 10);
        const interestId = parseInt(req.params.interestId, 10);

        if (isNaN(callId) || isNaN(interestId)) {
            return res.status(400).json({
                status: "Error",
                message: "Los IDs deben ser números válidos"
            });
        }

        const record = await callAdditionalInterest.getCallAdditionalInterestById(callId, interestId);
        if (!record) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la relación con callId=${callId} e interestId=${interestId}`
            });
        }
        res.status(200).json({ status: "Ok", data: record });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createCallAdditionalInterest = async (req, res) => {
    try {
        const { callId, interestId } = req.body;

        if (!callId || !interestId) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: callId, interestId"
            });
        }

const newRecord = await callAdditionalInterest.createCallAdditionalInterest(callId, interestId);
        res.status(201).json({ status: "Ok", data: newRecord });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateCallAdditionalInterest = async (req, res) => {
    try {
        const callId = parseInt(req.params.callId, 10);
        const interestId = parseInt(req.params.interestId, 10);

        if (isNaN(callId) || isNaN(interestId)) {
            return res.status(400).json({
                status: "Error",
                message: "Los IDs deben ser números válidos"
            });
        }

        const { newCallId, newInterestId } = req.body;
        if (!newCallId || !newInterestId) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: newCallId, newInterestId"
            });
        }

        const updatedRecord = await callAdditionalInterest.updateCallAdditionalInterest(
            callId,
            interestId,
            { newCallId, newInterestId }
        );

        if (!updatedRecord) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la relación con callId=${callId} e interestId=${interestId}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedRecord });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteCallAdditionalInterest = async (req, res) => {
    try {
        const callId = parseInt(req.params.callId, 10);
        const interestId = parseInt(req.params.interestId, 10);

        if (isNaN(callId) || isNaN(interestId)) {
            return res.status(400).json({
                status: "Error",
                message: "Los IDs deben ser números válidos"
            });
        }

        const deletedRecord = await callAdditionalInterest.deleteCallAdditionalInterest(callId, interestId);
        if (!deletedRecord) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la relación con callId=${callId} e interestId=${interestId}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Relación eliminada correctamente" });
    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({
                status: "Error",
                message: "No se puede eliminar la relación porque está asociada a otros registros"
            });
        }
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllCallAdditionalInterests,
    getCallAdditionalInterestById,
    createCallAdditionalInterest,
    updateCallAdditionalInterest,
    deleteCallAdditionalInterest,
};
