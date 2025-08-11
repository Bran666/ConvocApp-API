// routes/api/v1/roles.js
const db = require("../../../models");
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
router.post('/new', roleController.createRole);
router.put('/update/:id', roleController.updateRole);
router.delete('/delete/:id', roleController.deleteRole);

module.exports = router;
