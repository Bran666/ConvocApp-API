const db = require("../../../models");
const callAdditionalInterestController = require("../../../controllers/callAdditionalInterestController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testCallAdditionalInterestApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from CallAdditionalInterest!",
  });
});

// Rutas de callAdditionalInterest
router.get("/", callAdditionalInterestController.getAllCallAdditionalInterests);
router.get("/:callId/:interestId", callAdditionalInterestController.getCallAdditionalInterestById);
router.post("/new", callAdditionalInterestController.createCallAdditionalInterest);
router.put("/update/:callId/:interestId", callAdditionalInterestController.updateCallAdditionalInterest);
router.delete("/delete/:callId/:interestId", callAdditionalInterestController.deleteCallAdditionalInterest);

module.exports = router;
