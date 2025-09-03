const requirementCategoryController = require("../../../controllers/requirementCategoryController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testRequirementCategoryApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from RequirementCategory!",
  });
});

// Rutas de requirementCategory con los verbos HTTP
router.get('/', requirementCategoryController.getAllRequirementCategories);
router.get('/:id', requirementCategoryController.getRequirementCategoryById);
router.post('/', requirementCategoryController.createRequirementCategory);
router.put('/:id', requirementCategoryController.updateRequirementCategory);
router.delete('/:id', requirementCategoryController.deleteRequirementCategory);

module.exports = router;
