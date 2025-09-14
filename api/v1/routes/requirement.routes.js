const requirementController = require("../../../controllers/requirementController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testRequirementApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Requirements!",
  });
});

// Rutas de requirements con los verbos HTTP
router.get('/', requirementController.getAllRequirements);
router.get('/:id', requirementController.getRequirementById);
router.post('/', requirementController.createRequirement);
router.put('/:id', requirementController.updateRequirement);
router.delete('/:id', requirementController.deleteRequirement);

module.exports = router;
