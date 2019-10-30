const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.route('/').post(UserController.registerUser);
router.route('/:id').get(UserController.getUser);
router.route('/:id').put(UserController.updateUser);

module.exports = router;