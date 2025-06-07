const db = require("../../../models");

const tipoController = require("../../../controllers/tipoController");

const { Router } = require("express");
const router = Router();

router.get("/testUserApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Users!",
  });
});

// Rutas del tipo con los verbos HTTP
router.get('/', tipoController.getAllTipos);
router.get('/:id', tipoController.getTipoById);
router.post('/new', tipoController.createTipo);
router.put('/update/:id', tipoController.updateTipo);
router.delete('/delete/:id', tipoController.deleteTipo);

module.exports = router;
