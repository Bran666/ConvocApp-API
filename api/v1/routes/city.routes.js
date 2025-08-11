const db = require("../../../models");
const cityController = require("../../../controllers/cityController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testCityApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Cities!",
  });
});

// Rutas de cities con los verbos HTTP
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);
router.post('/new', cityController.createCity);
router.put('/update/:id', cityController.updateCity);
router.delete('/delete/:id', cityController.deleteCity);

module.exports = router;
