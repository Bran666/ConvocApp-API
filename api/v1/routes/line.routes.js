const db = require("../../../models");
const lineController = require("../../../controllers/lineController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testLineApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Lines!",
  });
});

// Rutas de lines con los verbos HTTP
router.get('/', lineController.getAllLines);
router.get('/:id', lineController.getLineById);
router.post('/new', lineController.createLine);
router.put('/update/:id', lineController.updateLine);
router.delete('/delete/:id', lineController.deleteLine);

module.exports = router;
