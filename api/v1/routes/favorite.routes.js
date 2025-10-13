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

// ✅ Ruta para obtener favoritos por usuario
router.get("/user/:userId", favoriteController.getFavoritesByUser);

// Otras rutas existentes
router.get("/", favoriteController.getAllFavorites);
router.get("/:id", favoriteController.getFavoriteById);
router.post("/", favoriteController.createFavorite);
router.put("/:id", favoriteController.updateFavorite);
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router;


module.exports = router;
