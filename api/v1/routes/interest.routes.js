const interestController = require("../../../controllers/interestController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testInterestApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from Interests!",
  });
});

// Rutas de interests con los verbos HTTP
router.get('/', interestController.getAllInterests);
router.get('/:id', interestController.getInterestById);
router.post('/', interestController.createInterest);
router.put('/:id', interestController.updateInterest);
router.delete('/:id', interestController.deleteInterest);

module.exports = router;
