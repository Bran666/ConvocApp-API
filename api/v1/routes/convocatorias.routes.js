const db = require("../../../models");
const convocatoriaController = require("../../../controllers/convocatoriaController");
const { Router } = require("express");
const router = Router();

router.get("/", convocatoriaController.getAllConvocatorias);
router.get("/:id", convocatoriaController.getConvocatoriaById);
router.post("/", convocatoriaController.createConvocatoria);
router.put("/:id", convocatoriaController.editConvocatoria);
router.delete("/:id", convocatoriaController.deleteConvocatoria);

module.exports = router;
