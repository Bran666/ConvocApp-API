// services/departmentService.js
const db = require("../models");
const Department = db.Department;
const City = db.City; // <-- para incluir las ciudades relacionadas

const getAllDepartments = async () => {
    try {
        return await Department.findAll({
            include: [
                {
                    model: City,
                    as: "cities", // usa el alias definido en la asociación
                    attributes: ["id", "name", "departmentId"]
                }
            ]
        });
    } catch (error) {
        console.error("Error fetching departments:", error);
        return null;
    }
};

const getDepartmentById = async (id) => {
    try {
        return await Department.findByPk(id, {
            include: [
                {
                    model: City,
                    as: "cities",
                    attributes: ["id", "name", "departmentId"]
                }
            ]
        });
    } catch (error) {
        console.error("Error fetching department:", error);
        return null;
    }
};

const createDepartment = async (name) => {
    try {
        const newDepartment = await Department.create({ name });

        return await Department.findByPk(newDepartment.id, {
            include: [
                {
                    model: City,
                    as: "cities",
                    attributes: ["id", "name", "departmentId"]
                }
            ]
        });
    } catch (error) {
        console.error("Error creating department:", error);
        return null;
    }
};

const updateDepartment = async (id, name) => {
    try {
        const department = await Department.findByPk(id);
        if (!department) return null;

        department.name = name;
        await department.save();

        return await Department.findByPk(id, {
            include: [
                {
                    model: City,
                    as: "cities",
                    attributes: ["id", "name", "departmentId"]
                }
            ]
        });
    } catch (error) {
        console.error("Error updating department:", error);
        return null;
    }
};

const deleteDepartment = async (id) => {
    try {
        // Verificar si existe el departamento
        const department = await Department.findByPk(id, {
            include: [{ model: City, as: "cities" }]
        });
        if (!department) return null;

        // Si tiene ciudades relacionadas
        if (department.cities && department.cities.length > 0) {
            return { hasCities: true };
        }

        // Eliminar
        await Department.destroy({ where: { id } });
        return { id };
    } catch (error) {
        console.error("Error deleting department:", error);
        throw error;
    }
};


module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};
