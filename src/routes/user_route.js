const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.route('/').post(UserController.regiterUser);

module.exports = router;