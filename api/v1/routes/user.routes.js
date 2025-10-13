const userController = require("../../../controllers/userController");
const { Router } = require("express");
const { authenticateToken } = require("../../../middleware/authMiddleware");
const router = Router();

router.get("/testUserApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Users!",
  });
});

//Rutas del usuario con los verbpos http
router.post('/', userController.createUser); // Ruta pública para crear usuarios

router.get('/',  userController.getAllUsers);
router.get('/:id',  userController.getUserById);
router.put('/:id',  userController.updateUser);
router.delete('/:id',  userController.deleteUser);

module.exports = router;