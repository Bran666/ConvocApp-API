const userInterestController = require("../../../controllers/userInterestController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testUserInterestApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from UserInterests!",
  });
});

// Rutas de user_interests con los verbos HTTP
router.get('/', userInterestController.getAllUserInterests);
router.get('/:userId/:interestId', userInterestController.getUserInterestById);
router.post('/', userInterestController.createUserInterest);
router.put('/:userId/:interestId', userInterestController.updateUserInterest);
router.delete('/:userId/:interestId', userInterestController.deleteUserInterest);

module.exports = router;
