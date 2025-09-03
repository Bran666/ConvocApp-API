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
router.post('/', requirementGroupController.createRequirementGroup);
router.put('/:id', requirementGroupController.updateRequirementGroup);
router.delete('/:id', requirementGroupController.deleteRequirementGroup);

module.exports = router;
