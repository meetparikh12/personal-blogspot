const ErrorHandling = require('../models/error-handling');
const User = require('../models/user');
const {validationResult}= require('express-validator');
const bcrypt = require('bcryptjs');

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
        user
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
        return next(new ErrorHandling('Invalid Credentials', 422))
    }
    if (!user) {
        return next(new ErrorHandling('Invalid Credentials', 422))
    }
    let result;
    try {
         result = await bcrypt.compare(password, user.password)
    } catch(err) {
        return next(new ErrorHandling('Password not compared', 422))   
    }
    if(!result) {
        return next(new ErrorHandling('Invalid Credentials', 422))
    } 
    res.status(200).json({
        user
    })
}