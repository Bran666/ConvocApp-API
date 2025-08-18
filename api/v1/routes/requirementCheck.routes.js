const db = require("../../../models");
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
router.post('/new', requirementCheckController.createRequirementCheck);
router.put('/update/:id', requirementCheckController.updateRequirementCheck);
router.delete('/delete/:id', requirementCheckController.deleteRequirementCheck);

module.exports = router;
