const db = require("../../../models");

const requisitoSeleccionController = require("../../../controllers/requisitoSeleccionController");

const { Router } = require("express");
const router = Router();

router.get("/testUserApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Users!",
  });
});

// Rutas del requisitoSeleccion con los verbos HTTP
router.get('/', requisitoSeleccionController.getAllRequisitosSeleccion);
router.get('/:id', requisitoSeleccionController.getRequisitoSeleccionById);
router.post('/new', requisitoSeleccionController.createRequisitoSeleccion);
router.put('/update/:id', requisitoSeleccionController.updateRequisitoSeleccion);
router.delete('/delete/:id', requisitoSeleccionController.deleteRequisitoSeleccion);

module.exports = router;
