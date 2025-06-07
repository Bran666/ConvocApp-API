const db = require("../../../models");

const lineaController = require("../../../controllers/lineaController");

const { Router } = require("express");
const router = Router();

router.get("/testLineaApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Lineas!",
  });
});

// Rutas de linea con los verbos http
router.get('/', lineaController.getAllLineas);
router.get('/:id', lineaController.getLineaById);
router.post('/new', lineaController.createLinea);
router.put('/update/:id', lineaController.updateLinea);
router.delete('/delete/:id', lineaController.deleteLinea);

module.exports = router;
