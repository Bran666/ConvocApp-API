const requirementCheckController = require("../../../controllers/requirementCheckController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testRequirementCheckApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from RequirementCheck!",
  });
});

// Rutas de requirementCheck con los verbos HTTP
router.get('/', requirementCheckController.getAllRequirementChecks);
router.get('/:id', requirementCheckController.getRequirementCheckById);
router.post('/', requirementCheckController.createRequirementCheck);
router.put('/:id', requirementCheckController.updateRequirementCheck);
router.delete('/:id', requirementCheckController.deleteRequirementCheck);

module.exports = router;
