const express = require('express')
const route = express.Router();
const postsController = require('../controllers/posts');
const { body } = require('express-validator');
const fileUpload = require('../middleware/file-upload');

route.get('/', postsController.GET_ALL_POSTS);

route.get('/:postId', postsController.GET_POST_BY_POSTID);

route.get('/user/:userId', postsController.GET_POSTS_BY_USERID);

route.post('/', fileUpload.single('image'), [
    body('title').trim().isLength({min:5}).withMessage('Title must be atleast 5 characters long.'),
    body('description').trim().isLength({min: 10}).withMessage('Description must be atleast 10 characters long.')
], postsController.CREATE_NEW_POST);

route.patch('/:postId',[
    body('title').trim().isLength({min:5}).withMessage('Title must be atleast 5 characters long.'),
    body('description').trim().isLength({min: 10}).withMessage('Description must be atleast 10 characters long.')
] ,postsController.UPDATE_POST);

route.delete('/:postId', postsController.DELETE_POST);

module.exports = route;