const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.route('/').get(UserController.getAllUser);
router.route('/register').post(UserController.registerUser);
router.route('/login').post(UserController.loginUser);
router.route('/:id').get(UserController.getUser);
router.route('/:id').put(UserController.updateUser);
router.route('/:id').delete(UserController.deleteUser);

module.exports = router;