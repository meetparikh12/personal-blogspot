const express = require('express')
const Post = require('../models/post');
const ErrorHandling = require('../models/error-handling');
const { v4: uuidv4 } = require('uuid');
const route = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const postsController = require('../controllers/posts');

route.get('/', postsController.GET_ALL_POSTS);

route.get('/:postId', postsController.GET_POST_BY_POSTID);

route.get('/user/:userId', postsController.GET_POSTS_BY_USERID);

route.post('/', postsController.CREATE_NEW_POST);

route.patch('/:postId', postsController.UPDATE_POST);

route.delete('/:postId', postsController.DELETE_POST);

module.exports = route;