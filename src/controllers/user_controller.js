const User = require('../models/user');
const ErrorHandler = require('../errors_response/error_handler');
const ErrorToFindUser = require('../errors_response/error_to_find_user');
const ErrorValidation = require('../errors_response/error_validation');
const Bcrypt = require('bcryptjs');

module.exports = class UserController {

    static async registerUser(req, res){
        try {
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
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

    static async deleteUser(req, res){
        try {
            const user = await User.findOneAndDelete({id: req.params.id});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            res.json({message: `${user.dni} is deleted`});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
};
