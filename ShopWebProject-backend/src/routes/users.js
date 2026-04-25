const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const { authenticate } = require('../app/middlewares/AuthMiddleware');
const upload = require('../app/middlewares/UploadMiddleware');

router.get('/total', userController.totalRegisteredUsers);
router.get('/email/:email', userController.findUserByEmail);
router.get('/me', authenticate, userController.findUserById);
router.patch('/me', authenticate, userController.updateProfile);
router.patch('/me/avatar', authenticate, upload.single('avatar'), userController.uploadAvatar);

module.exports = router;
