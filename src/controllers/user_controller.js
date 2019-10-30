const User = require('../models/user');
const ErrorHandler = require('../errors_response/error_handler');
const ErrorToFindUser = require('../errors_response/error_to_find_user');
const ErrorValidation = require('../errors_response/error_validation');

module.exports = class UserController {

    static async registerUser(req, res){
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
            const user = await User.findOne({id: req.params.id});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            res.json(user);
        } catch(error){
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateUser(req, res){
        try {
            const user = await User.findOneAndUpdate({id: req.params.id}, {$set: req.body}, {new: true});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            res.json(user);
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
};
