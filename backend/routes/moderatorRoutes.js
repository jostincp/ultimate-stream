const express = require('express');
const router = express.Router();
const moderatorController = require('../controllers/moderatorController');

router.get('/', moderatorController.getModerators);
router.post('/', moderatorController.addModerator);

module.exports = router;