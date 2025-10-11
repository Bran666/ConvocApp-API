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

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;