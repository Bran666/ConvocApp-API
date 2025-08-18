const db = require("../../../models");
const callController = require("../../../controllers/callController");
const { Router } = require("express");
const router = Router();

router.get('/', callController.getAllCalls);
router.get('/:id', callController.getCallById);
router.post('/new', callController.createCall);
router.put('/update/:id', callController.updateCall);
router.delete('/delete/:id', callController.deleteCall);

module.exports = router;
