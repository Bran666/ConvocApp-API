const { CallHistory, Institution, Line, TargetAudience, Interest, User, Call } = require("../models");

// Obtener todos los registros
const getAllCallHistories = async ({ includeRelations = false } = {}) => {
    const options = {};
    if (includeRelations) {
        options.include = [
            { model: Institution, as: 'institution' },
            { model: Line, as: 'line' },
            { model: TargetAudience, as: 'targetAudience' },
            { model: Interest, as: 'interest' },
            { model: User, as: 'user' },
            { model: Call, as: 'originalCall' } // ✅ alias correcto
        ];
    }
    return CallHistory.findAll(options);
};

// Obtener por ID
const getCallHistoryById = async (id, { includeRelations = false } = {}) => {
    const options = { where: { id } };
    if (includeRelations) {
        options.include = [
            { model: Institution, as: 'institution' },
            { model: Line, as: 'line' },
            { model: TargetAudience, as: 'targetAudience' },
            { model: Interest, as: 'interest' },
            { model: User, as: 'user' },
            { model: Call, as: 'originalCall' }
        ];
    }
    return CallHistory.findOne(options);
};

// Crear nuevo registro
const createCallHistory = async (data) => {
    return CallHistory.create(data);
};

// Actualizar registro existente
const updateCallHistory = async (id, data) => {
    const [updated] = await CallHistory.update(data, { where: { id } });
    if (!updated) return null;
    return CallHistory.findByPk(id);
};

// Eliminar registro
const deleteCallHistory = async (id) => {
    const deleted = await CallHistory.destroy({ where: { id } });
    return deleted > 0;
};


module.exports = {
    getAllCallHistories,
    getCallHistoryById,
    createCallHistory,
    updateCallHistory,
    deleteCallHistory
};
