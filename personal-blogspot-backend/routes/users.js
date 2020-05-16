const express = require('express')
const route = express.Router();
const ErrorHandling = require('../models/error-handling');
const User = require('../models/user');
const usersController = require('../controllers/users');

route.post('/register', usersController.SIGNUP_USER);

route.post('/login', usersController.LOGIN_USER);

module.exports = route;