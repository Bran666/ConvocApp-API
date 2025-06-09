const db = require("../../../models");
const rolController = require("../../../controllers/rolcontroller");
const { Router } = require("express");
const router = Router();

router.get("/testUserApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Users!",
  });
});

//Rutas del usuario con los verbpos http
router.get('/', rolController.getAllrol);
router.get('/:id', rolController.getrolById);
router.post('/new', rolController.createrol);
router.put('/update/:id', rolController.updaterol);
router.delete('/delete/:id', rolController.deleterol);

module.exports = router;