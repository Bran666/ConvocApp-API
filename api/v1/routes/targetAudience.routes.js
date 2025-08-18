const db = require("../../../models");
const targetAudienceController = require("../../../controllers/targetAudienceController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testTargetAudienceApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Target Audiences!",
  });
});

// Rutas de target_audiences con los verbos HTTP
router.get('/', targetAudienceController.getAllTargetAudiences);
router.get('/:id', targetAudienceController.getTargetAudienceById);
router.post('/new', targetAudienceController.createTargetAudience);
router.put('/update/:id', targetAudienceController.updateTargetAudience);
router.delete('/delete/:id', targetAudienceController.deleteTargetAudience);

module.exports = router;
