const companyController = require("../../../controllers/companyController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testCompanyApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Companies!",
  });
});

// Rutas de companies con los verbos HTTP
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
router.post('/', companyController.createCompany);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;
