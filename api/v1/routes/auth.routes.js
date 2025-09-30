const AuthController = require("../../../controllers/authController");
const { Router } = require("express");

const router = Router();

router.post('/authenticate', AuthController.authenticate);
router.get('/authenticated', AuthController.getUserAuthenticated);
router.post('/forgotPassword', AuthController.forgotPassword);
router.post('/resetPassword', AuthController.resetPassword);

// 👇 FALTA ESTA
router.post('/verifyCode', AuthController.verifyCode);

module.exports = router;
