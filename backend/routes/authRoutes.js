const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerStreamer);
router.post('/login', authController.loginStreamer);
router.post('/login/moderator', authController.loginModerator);

module.exports = router;