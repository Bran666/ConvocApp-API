const callController = require("../../../controllers/callController");
const { Router } = require("express");
const multer = require("multer");

const router = Router();

// Configuración: guardar imágenes en /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.get('/', callController.getAllCalls);
router.get('/:id', callController.getCallById);
router.post('/', upload.single("image"), callController.createCall);
router.put('/:id', upload.single("image"), callController.updateCall);
router.delete('/:id', callController.deleteCall);

module.exports = router;
