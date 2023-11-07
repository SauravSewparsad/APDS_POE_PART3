const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const {isValidPassword} = require('../utils/hash');
//brute-force protection middleware for express routes that rate-1
//const ExpressBrute = require('express-brute');
//in store memory for presisting request counts
//const store = new ExpressBrute.MemoryStore();
//const bruteforce = new ExpressBrute(store);
//login route
router.post('/', /*bruteforce.prevent,*/ async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user)
        return res.status(400).json({error: 'Incorrect Username or Password'});

        const valid = await isValidPassword(req.body.password, user.password);

        if(!valid)
            return res.status(401).json({error: 'Incorrect Username or Password'});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY);
        res.send({token});
});

module.exports = router;