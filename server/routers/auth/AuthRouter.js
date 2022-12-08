const express = require('express');
const router = express.Router();
const authController = require('../../controller/AuthController');

router.post('/login', authController.login);
router.post('/register', authController.createUser);
router.post('/forget-password', authController.forgetPassword);
router.post('/password-reset-token-check', authController.checkValidePasswordResetToken);
router.post('/user-password-reset', authController.changePassword);
router.post('/logout', authController.logout);

module.exports = router;