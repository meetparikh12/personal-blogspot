const express = require('express')
const route = express.Router();
const usersController = require('../controllers/users');
const { body } = require('express-validator');

route.post('/register', [
    body('name').trim().isLength({min: 4}).withMessage('Name should be atleast 4 characters long.'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password should be atleast 6 characters long')
] , usersController.SIGNUP_USER);

route.post('/login', usersController.LOGIN_USER);

module.exports = route;