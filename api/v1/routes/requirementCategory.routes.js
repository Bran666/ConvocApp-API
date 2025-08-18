const db = require("../../../models");
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
router.post('/new', requirementCategoryController.createRequirementCategory);
router.put('/update/:id', requirementCategoryController.updateRequirementCategory);
router.delete('/delete/:id', requirementCategoryController.deleteRequirementCategory);

module.exports = router;
