// Enlazamos el servicio (capa) de compañías
const companyService = require("../services/companyService");
const { City } = require("../models"); // importar modelo City para validar cityId

const getAllCompanies = async (req, res) => {
    try {
        const allCompanies = await companyService.getAllCompanies({ includeCity: true });
        if (!allCompanies || allCompanies.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron compañías"
            });
        }
        res.status(200).json({ status: "Ok", data: allCompanies });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const company = await companyService.getCompanyById(id, { includeCity: true });
        if (!company) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la compañía con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: company });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const createCompany = async (req, res) => {
    try {
        const {
            name,
            taxId,
            legalName,
            address,
            phone,
            website,
            employeeCount,
            economicSector,
            description,
            existenceYears,
            legalDocument,
            legalFirstName,
            legalLastName,
            legalRepresentativeName,
            legalRepresentativeRole,
            legalRepresentativePhone,
            legalRepresentativeEmail,
            landline,
            legalMobile,
            email,
            legalPosition,
            cityId
        } = req.body;

        // Lista de campos obligatorios
        const requiredFields = {
            name,
            taxId,
            legalName,
            address,
            phone,
            website,
            employeeCount,
            economicSector,
            description,
            existenceYears,
            legalDocument,
            legalFirstName,
            legalLastName,
            legalRepresentativeName,
            legalRepresentativeRole,
            legalRepresentativePhone,
            legalRepresentativeEmail,
            landline,
            legalMobile,
            email,
            legalPosition,
            cityId
        };

        // Verificar si falta alguno
        const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                status: "Error",
                message: `Faltan campos obligatorios: ${missingFields.join(", ")}`
            });
        }

        // Validar si la ciudad existe
        const cityExists = await City.findByPk(cityId);
        if (!cityExists) {
            return res.status(400).json({
                status: "Error",
                message: `No existe la ciudad con ID ${cityId}`
            });
        }

        // Crear compañía
        const newCompany = await companyService.createCompany(requiredFields);

        res.status(201).json({ status: "Ok", data: newCompany });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateCompany = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        // Si el usuario envía un nuevo cityId, validar que exista
        if (req.body.cityId) {
            const cityExists = await City.findByPk(req.body.cityId);
            if (!cityExists) {
                return res.status(400).json({
                    status: "Error",
                    message: `No existe la ciudad con ID ${req.body.cityId}`
                });
            }
        }

        const updatedCompany = await companyService.updateCompany(id, req.body);
        if (!updatedCompany) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la compañía con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedCompany });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedCompany = await companyService.deleteCompany(id);
        if (!deletedCompany) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró la compañía con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Compañía eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
};
