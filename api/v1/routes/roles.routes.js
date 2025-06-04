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
router.get('/', rolController.getAllUsers);
router.get('/:id', rolController.getUserById);
router.post('/new', rolController.createUser);
router.put('/update/:id', rolController.updateUser);
router.delete('/delete/:id', rolController.deleteUser);

module.exports = router;