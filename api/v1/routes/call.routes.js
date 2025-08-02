const db = require("../../../models");
const callController = require("../../../controllers/callController");
const { Router } = require("express");
const router = Router();

router.get('/', callController.getAllCalls);
router.get('/:id', callController.getCallById);
router.post('/', callController.createCall);
router.put('/:id', callController.updateCall);
router.delete('/:id', callController.deleteCall);

module.exports = router;
