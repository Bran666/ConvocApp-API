const institutionController = require("../../../controllers/institutionController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testInstitutionApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Institutions!",
  });
});

// Rutas de institutions con los verbos HTTP
router.get('/', institutionController.getAllInstitutions);
router.get('/:id', institutionController.getInstitutionById);
router.post('/', institutionController.createInstitution);
router.put('/:id', institutionController.updateInstitution);
router.delete('/:id', institutionController.deleteInstitution);

module.exports = router;
