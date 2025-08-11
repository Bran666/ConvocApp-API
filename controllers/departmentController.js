// Enlazamos el servicio (capa) de departamentos
const departmentService = require("../services/departmentService");

const getAllDepartments = async (req, res) => {
    try {
        const allDepartments = await departmentService.getAllDepartments();
        if (!allDepartments || allDepartments.length === 0) {
            return res.status(404).send({
                status: "Error",
                message: "No se encontraron departamentos"
            });
        }
        res.status(200).send({ status: "Ok", data: allDepartments });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const department = await departmentService.getDepartmentById(id);
        if (!department) {
            return res.status(404).send({
                status: "Error",
                message: `No se encontró el departamento con ID ${id}`
            });
        }
        res.status(200).send({ status: "Ok", data: department });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
};

const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({
                status: "Error",
                message: "Falta el campo obligatorio: name"
            });
        }

        const newDepartment = await departmentService.createDepartment(name);
        res.status(201).send({ status: "Ok", data: newDepartment });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        const updatedDepartment = await departmentService.updateDepartment(id, name);
        if (!updatedDepartment) {
            return res.status(404).send({
                status: "Error",
                message: `No se encontró el departamento con ID ${id}`
            });
        }

        res.status(200).send({ status: "Ok", data: updatedDepartment });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await departmentService.deleteDepartment(id);

        if (!result) {
            return res.status(404).send({
                status: "Error",
                message: `No se encontró el departamento con ID ${id}`
            });
        }

        if (result.hasCities) {
            return res.status(400).send({
                status: "Error",
                message: `No se pudo eliminar el departamento con ID ${id} ya que tiene ciudades asignadas`
            });
        }

        res.status(200).send({ status: "Ok", data: result });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
};




module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};
