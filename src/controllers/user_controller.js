const User = require('../models/user');

class UserController {

    static async regiterUser(req, res){
        const user = new User(req.body);
        await user.save();
        res.send(user);
    };
}

module.exports = UserController;