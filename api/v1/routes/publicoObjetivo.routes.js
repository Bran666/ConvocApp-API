const db = require("../../../models");

const publicoObjetivoController = require("../../../controllers/publicoObjetivoController");

const { Router } = require("express");
const router = Router();

// Ruta de prueba para verificar si funciona la API
router.get("/testPublicoObjetivoApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from PublicoObjetivo!",
  });
});

// Rutas de publicoObjetivo con los verbos HTTP
router.get('/', publicoObjetivoController.getAllPublicos);
router.get('/:id', publicoObjetivoController.getPublicoById);
router.post('/new', publicoObjetivoController.createPublico);
router.put('/update/:id', publicoObjetivoController.updatePublico);
router.delete('/delete/:id', publicoObjetivoController.deletePublico);

module.exports = router;
