const { Line, Call } = require("../models");

const getAllLines = async () => {
    return Line.findAll();
};

const getLineById = async (id) => {
    return Line.findOne({ where: { id } });
};

const createLine = async (data) => {
    return Line.create(data);
};

const updateLine = async (id, data) => {
    const [updated] = await Line.update(data, { where: { id } });
    if (!updated) return null;
    return Line.findByPk(id);
};

const deleteLine = async (id) => {
    try {
        const deleted = await Line.destroy({ where: { id } });
        return deleted > 0;
    } catch (error) {
        // Captura el error de llave foránea de Postgres
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            throw new Error('No se puede eliminar la línea porque está asociada a una o más convocatorias');
        }
        throw error;
    }
};

module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine
};
