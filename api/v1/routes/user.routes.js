const db = require("../../../models");
const userController = require("../../../controllers/userController");
const { Router } = require("express");
const router = Router();

router.get("/testUserApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Users!",
  });
});

//Rutas del usuario con los verbpos http
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/new', userController.createUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;