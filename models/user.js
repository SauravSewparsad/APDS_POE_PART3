const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true},
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        password: String,
    }
)

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().max(50).required(),
        gender: Joi.string().max(50).required(),
        password: Joi.string().min(3).max(50).required(),
        
    });
    return schema.validate(user);
}

module.exports = {User, validateUser};