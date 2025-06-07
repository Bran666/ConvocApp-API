const db = require("../../../models");

const empresaController = require("../../../controllers/empresaController");

const { Router } = require("express");
const router = Router();

router.get("/testUserApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Users!",
  });
});

//Rutas del usuario con los verbpos http
router.get('/', empresaController.getAllEmpresas);
router.get('/:id', empresaController.getEmpresasById);
router.post('/new', empresaController.createEmpresas);
router.put('/update/:id', empresaController.updateEmpresas);
router.delete('/delete/:id', empresaController.deleteEmpresas);

module.exports = router;
