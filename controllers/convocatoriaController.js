const convocatoriaService = require("../services/convocatoriaService");

const getAllConvocatorias = async (req, res) => {
    const allConvocatorias = await convocatoriaService.getAllConvocatorias();
    if (allConvocatorias) {
        res.status(200).send({ status: "Ok", data: allConvocatorias })
    } else {
        res.status(400), send({ status: "error", message: null })
    }
}

const getConvocatoriaById = async (req, res) => {
    const id = req.params.id
    const convocatoria = await convocatoriaService.getConvocatoriaById(id);
    if (convocatoria) {
        res.status(200).send({ status: "Ok", data: convocatoria })
    } else {
        res.status(400), send({ status: "error", message: null })
    }
}

const createConvocatoria = async (req, res) => {
    const { idConvocatorias, nombre, recursos, linkConvocatoria, fechaApertura, fechaCierre, nombrePagina, pagina } = req.body
    const convocatoria = await convocatoriaService.createConvocatoria(idConvocatorias, nombre, recursos, linkConvocatoria, fechaApertura, fechaCierre, nombrePagina, pagina);

    if (convocatoria) {
        res.status(200).send({ status: "Ok", data: convocatoria })
    } else {
        res.status(400).send({ status: "Error", message: error })
    }
}

const editConvocatoria = async (req, res) => {
    const id = req.params.id;
    const { idConvocatorias, nombre, recursos, linkConvocatoria, fechaApertura, fechaCierre, nombrePagina, pagina } = req.body;
    const convocatoria = await convocatoriaService.editConvocatoria(id, idConvocatorias, nombre, recursos, linkConvocatoria, fechaApertura, fechaCierre, nombrePagina, pagina);

    if (convocatoria) {
        res.status(200).send({ status: "Ok", data: convocatoria });
    } else {
        res.status(400).send({ status: "error", message: error });
    }
}

const deleteConvocatoria = async (req, res) => {
    const id = req.params.id;
    const convocatoria = await convocatoriaService.deleteConvocatoria(id);

    if (convocatoria) {
        res.status(200).send({ status: "Ok", data: convocatoria });

    } else {
        res.status(400).send({ status: "error", message: error });
    }
}

module.exports = {
    getAllConvocatorias,
    getConvocatoriaById,
    createConvocatoria,
    editConvocatoria,
    deleteConvocatoria
}