// Enlazamos el servicio (capa) de historial de llamadas
const callHistoryService = require("../services/callHistoryService");

const getAllCallHistories = async (req, res) => {
    try {
        const allHistories = await callHistoryService.getAllCallHistories({ includeRelations: true });
        if (!allHistories || allHistories.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron historiales de llamadas"
            });
        }
        res.status(200).json({ status: "Ok", data: allHistories });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getCallHistoryById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const history = await callHistoryService.getCallHistoryById(id, { includeRelations: true });
        if (!history) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el historial con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: history });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};


// Crear nuevo CallHistory
const createCallHistory = async (req, res) => {
    try {
        const {
            callId,              // en DB es original_id
            institutionId,       // institution_id
            lineId,              // line_id
            targetAudienceId,    // target_audience_id
            interestId,          // interest_id
            userId,              // user_id
            title,               // title (NOT NULL)
            description,         // description
            resources,           // resources
            call_link,           // call_link
            open_date,           // open_date
            close_date,          // close_date
            page_name,           // page_name
            page_url,            // page_url
            objective,           // objective
            notes,               // notes
            image_url,           // image_url
            is_active            // is_active
        } = req.body;

        // Validaciones mínimas
        if (!callId || !userId || !title) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: callId, userId, title"
            });
        }

        // Crear el registro
        const newHistory = await callHistoryService.createCallHistory({
            originalId: callId,          // Mapeo correcto
            institutionId,
            lineId,
            targetAudienceId,
            interestId,
            userId,
            title,
            description,
            resources,
            callLink: call_link,
            openDate: open_date,
            closeDate: close_date,
            pageName: page_name,
            pageUrl: page_url,
            objective,
            notes,
            imageUrl: image_url,
            isActive: is_active
        });

        // 🔥 Reconsultar con relaciones incluidas
        const fullHistory = await callHistoryService.getCallHistoryById(newHistory.id, { includeRelations: true });

        res.status(201).json({ status: "Ok", data: fullHistory });

    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            console.error("⚠️ Error de FK (create):", {
                fields: error.fields,
                index: error.index,
                table: error.table,
                detail: error.parent?.detail
            });

            let field = Object.keys(error.fields || {})[0];
            let value = Object.values(error.fields || {})[0];

            if (!field && error.parent?.detail) {
                const match = error.parent.detail.match(/\((.*?)\)=\((.*?)\)/);
                if (match) {
                    field = match[1];
                    value = match[2];
                }
            }

            return res.status(400).json({
                status: "Error",
                message: field
                    ? `El registro relacionado no existe en la tabla para el campo: ${field} (valor: ${value})`
                    : `El registro relacionado no existe en alguna tabla (restricción: ${error.index || "desconocida"})`
            });
        }

        res.status(500).json({ status: "Error", message: error.message });
    }
};



const updateCallHistory = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const {
            callId,              // original_id
            institutionId,       // institution_id
            lineId,              // line_id
            targetAudienceId,    // target_audience_id
            interestId,          // interest_id
            userId,              // user_id
            title,               // title
            description,         // description
            resources,           // resources
            call_link,           // call_link
            open_date,           // open_date
            close_date,          // close_date
            page_name,           // page_name
            page_url,            // page_url
            objective,           // objective
            notes,               // notes
            image_url,           // image_url
            is_active            // is_active
        } = req.body;

        const updatedHistory = await callHistoryService.updateCallHistory(id, {
            originalId: callId,
            institutionId,
            lineId,
            targetAudienceId,
            interestId,
            userId,
            title,
            description,
            resources,
            callLink: call_link,
            openDate: open_date,
            closeDate: close_date,
            pageName: page_name,
            pageUrl: page_url,
            objective,
            notes,
            imageUrl: image_url,
            isActive: is_active
        });

        if (!updatedHistory) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el historial con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedHistory });
    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            console.error("⚠️ Error de FK (update):", {
                fields: error.fields,
                index: error.index,
                table: error.table,
                detail: error.parent?.detail
            });

            let field = Object.keys(error.fields || {})[0];
            let value = Object.values(error.fields || {})[0];

            if (!field && error.parent?.detail) {
                const match = error.parent.detail.match(/\((.*?)\)=\((.*?)\)/);
                if (match) {
                    field = match[1];
                    value = match[2];
                }
            }

            return res.status(400).json({
                status: "Error",
                message: field
                    ? `El registro relacionado no existe en la tabla para el campo: ${field} (valor: ${value})`
                    : `El registro relacionado no existe en alguna tabla (restricción: ${error.index || "desconocida"})`
            });
        }

        res.status(500).json({ status: "Error", message: error.message });
    }
};





const deleteCallHistory = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedHistory = await callHistoryService.deleteCallHistory(id);
        if (!deletedHistory) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el historial con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Historial eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllCallHistories,
    getCallHistoryById,
    createCallHistory,
    updateCallHistory,
    deleteCallHistory,
};
