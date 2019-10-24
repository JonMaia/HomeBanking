const User = require('../models/user');
const ErrorHandler = require('../errors_response/error_handler');
const ErrorValidation = require('../errors_response/error_validation');

module.exports = class UserController {

    static async regiterUser(req, res){
        try {
            const user = new User(req.body);
            await user.save();
            res.send(user);
        } catch (error){
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async getUser(req, res){
        try {
            const user = await User.find({id: req.params.id});
            res.json(user);
        } catch(error){
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
};
