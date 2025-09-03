// routes/api/v1/roles.js
const roleController = require("../../../controllers/roleController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testRoleApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Roles!",
  });
});

// Rutas de roles con los verbos HTTP
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
