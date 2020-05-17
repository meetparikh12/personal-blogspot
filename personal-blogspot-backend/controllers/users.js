const ErrorHandling = require('../models/error-handling');
const User = require('../models/user');
const {validationResult}= require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.SIGNUP_USER = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        error.statusCode = 422;
        error.message = error.array()
        return next(error);
    }
    const {
        name,
        email,
        password
    } = req.body;
    let user;
    try {
        user = await User.findOne({
            email: email
        });
    } catch (err) {
        return next(new ErrorHandling('User not fetched', 500))
    }
    if (user) {
        return next(new ErrorHandling('Email already exists', 422))
    }
    let hashedPassword;
    try {
         hashedPassword = await bcrypt.hash(password, 12);
    } catch(err) {
        return next(new ErrorHandling('Password not hashed', 500));
    }

    user = new User({
        name,
        email,
        password: hashedPassword
    })
    
    try {
        await user.save();
    } catch (err) {
        return next(new ErrorHandling('User not registered', 500));
    }

    res.status(201).json({
        message: 'Registered Successfully!'
    });
}

exports.LOGIN_USER = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    let user;
    try {
        user = await User.findOne({
            email: email
        })
    } catch (err) {
        return next(new ErrorHandling('Invalid Credentials', 403))
    }
    if (!user) {
        return next(new ErrorHandling('Invalid Credentials', 403))
    }
    let result;
    try {
         result = await bcrypt.compare(password, user.password)
    } catch(err) {
        return next(new ErrorHandling('Password not compared', 403))   
    }
    if(!result) {
        return next(new ErrorHandling('Invalid Credentials', 403))
    } 
    let token;
    try {
        token = jwt.sign({
            userId: user._id,
            email: user.email
        }, config.get('secretKey'), {
            expiresIn: '1h'
        });
    } catch(err) {
        return next(new ErrorHandling('Not authenticated', 401))
    }
    res.status(200).json({
        token
    })
}