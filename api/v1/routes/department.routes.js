const db = require("../../../models");
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
router.post('/new', departmentController.createDepartment);
router.put('/update/:id', departmentController.updateDepartment);
router.delete('/delete/:id', departmentController.deleteDepartment);

module.exports = router;
