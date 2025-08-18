const db = require("../../../models");
const requirementGroupController = require("../../../controllers/requirementGroupController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testRequirementGroupApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from RequirementGroup!",
  });
});

// Rutas de requirementGroup con los verbos HTTP
router.get('/', requirementGroupController.getAllRequirementGroups);
router.get('/:id', requirementGroupController.getRequirementGroupById);
router.post('/new', requirementGroupController.createRequirementGroup);
router.put('/update/:id', requirementGroupController.updateRequirementGroup);
router.delete('/delete/:id', requirementGroupController.deleteRequirementGroup);

module.exports = router;
