const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: {
        type: Number,
        default: 1,
        unique: true
    },
    dni: {
        type: Number,
        validate: function (v) {
            return /(^([0-9]{8,8})|^)$/.test(v);
        },
        required: [true, 'The DNI is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'The username is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
        minlength: 6
    },
    email: {
        type: String,
        validate: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        required: [true, 'The email is required'],
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre('save', async function(next) {
    now = new Date();
    if(!this.date){
        this.date = now;
    }
    if(!this.isModified('password')){
        return next();
    }
    this.password = await Bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function(plainText) {
    const pass = await Bcrypt.compare(plainText, this.password);
    return pass;
}

UserSchema.plugin(AutoIncrement, {id: 'order_seq', inc_field: 'id'});
module.exports = mongoose.model('User', UserSchema);