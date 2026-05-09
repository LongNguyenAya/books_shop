const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.patch('/reset-password', authController.resetPassword);

module.exports = router;
