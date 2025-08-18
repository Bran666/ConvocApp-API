const db = require("../../../models");
const favoriteController = require("../../../controllers/favoriteController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testFavoriteApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Favorites!",
  });
});

// Rutas de favorites con los verbos HTTP
router.get('/', favoriteController.getAllFavorites);
router.get('/:id', favoriteController.getFavoriteById);
router.post('/new', favoriteController.createFavorite);
router.put('/update/:id', favoriteController.updateFavorite);
router.delete('/delete/:id', favoriteController.deleteFavorite);

module.exports = router;
