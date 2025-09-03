const departmentController = require("../../../controllers/departmentController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testDepartmentApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Departments!",
  });
});

// Rutas de departments con los verbos HTTP
router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
