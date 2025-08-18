const db = require("../../../models");
const callHistoryController = require("../../../controllers/callHistoryController");
const { Router } = require("express");
const router = Router();

// Ruta de prueba
router.get("/testCallHistoryApi", (req, res) => {
  res.send({
    status: "200",
    message: "Hello from CallHistory!",
  });
});

// Rutas de callHistory con los verbos HTTP
router.get("/", callHistoryController.getAllCallHistories);
router.get("/:id", callHistoryController.getCallHistoryById);
router.post("/new", callHistoryController.createCallHistory);
router.put("/update/:id", callHistoryController.updateCallHistory);
router.delete("/delete/:id", callHistoryController.deleteCallHistory);

module.exports = router;
