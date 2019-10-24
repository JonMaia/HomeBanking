const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.route('/').post(UserController.regiterUser);
router.route('/:id').get(UserController.getUser);

module.exports = router;