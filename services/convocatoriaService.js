const db = require("../models");

const getAllConvocatorias = async () => {
    try {
        const convocatorias = await db.convocatorias.findAll();
        return convocatorias;
    }
    catch (error) {
        throw new Error("Error al obtener las convocatorias" + error);
    }
}

const getConvocatoriaById = async (id) => {
    try {
        const convocatoria = await db.convocatorias.findByPk(id);
        return convocatoria
    } catch (error) {
        throw new Error("Error al obtener la convocatoria" + error)
    }
}

const createConvocatoria = async (idConvocatorias, nombre, recursos, linkConvocatoria, fechaApertura, fechaCierre, nombrePagina, pagina) => {
    try {
        const convocatoria = await db.convocatorias.create({ idConvocatorias, nombre, recursos, linkConvocatoria, fechaApertura, fechaCierre, nombrePagina, pagina });
        return convocatoria;
    }
    catch (error) {
        throw new Error("Error al crear la convocatoria " + error);
    }
}

const editConvocatoria = async (id, idConvocatorias, nombre, recursos, linkConvocatoria, fechaApertura, fechaCierre, nombrePagina, pagina) => {
    try {
        const convocatoria = await db.convocatorias.findByPk(id);

        convocatoria.idConvocatorias = idConvocatorias;
        convocatoria.nombre = nombre;
        convocatoria.recursos = recursos;
        convocatoria.linkConvocatoria = linkConvocatoria;
        convocatoria.fechaApertura = fechaApertura;
        convocatoria.fechaCierre = fechaCierre;
        convocatoria.nombrePagina = nombrePagina;
        convocatoria.pagina = pagina;

        await convocatoria.save();

        return convocatoria;

    } catch (error) {
        throw new Error("Error al actualizar la convocatoria" + error);
    }
}

const deleteConvocatoria = async (id) => {
    try {
        const convocatoria = await db.convocatorias.findByPk(id);
        await convocatoria.destroy();
        return convocatoria;
    } catch (error) {
        throw new Error("No se pudo eliminar la convocatoria" + error);
    }
}

module.exports = {
    getAllConvocatorias,
    getConvocatoriaById,
    createConvocatoria,
    editConvocatoria,
    deleteConvocatoria
}