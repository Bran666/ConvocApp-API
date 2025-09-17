const { City, Department } = require('../models');  // Asegúrate de que esto esté al inicio del archivo

// Obtener todas las ciudades (opcionalmente con su departamento)
const getAllCities = async ({ includeDepartment = false } = {}) => {
    const options = {};
    if (includeDepartment) {
        options.include = [
            {
                model: Department,
                as: 'department'
            }
        ];
    }
    return City.findAll(options);
};

// Obtener una ciudad por ID
const getCityById = async (id, { includeDepartment = false } = {}) => {
    const options = { where: { id } };
    if (includeDepartment) {
        options.include = [
            {
                model: Department,
                as: 'department'
            }
        ];
    }
    return City.findOne(options);
};


const createCity = async (name, departmentId) => { 
    try {
        console.log('Iniciando creación de ciudad...');
        console.log('Datos recibidos - name:', name, 'departmentId:', departmentId);
        
        // Verificar que departmentId sea un número válido
        const id = Number(departmentId);
        if (isNaN(id)) {
            throw new Error('El ID del departamento debe ser un número');
        }

        // Verificar que el departamento existe
        console.log('Buscando departamento con ID:', id);
        const department = await Department.findByPk(id);
        console.log('Resultado de búsqueda de departamento:', department ? 'Encontrado' : 'No encontrado');
        
        if (!department) {
            throw new Error(`No se encontró el departamento con ID: ${id}`);
        }

        // Crear la ciudad
        console.log('Creando ciudad...');
        const newCity = await City.create({ 
            name: name,
            departmentId: id
        });
        console.log('Ciudad creada exitosamente:', newCity.toJSON());

        return newCity;
    } catch (error) {
        console.error('Error en createCity:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        throw error;
    }
};


// Actualizar una ciudad
const updateCity = async (id, data) => {
    const [updated] = await City.update(data, { where: { id } });
    if (!updated) return null;
    return City.findByPk(id);
};

// Eliminar una ciudad
const deleteCity = async (id) => {
    const deleted = await City.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity
};
