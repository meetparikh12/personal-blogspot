const express = require('express')
const route = express.Router();
const postsController = require('../controllers/posts');
const { body } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const auth = require('../middleware/check-auth');

route.get('/', postsController.GET_ALL_POSTS);

route.get('/:postId', postsController.GET_POST_BY_POSTID);

route.get('/user/:userId', auth, postsController.GET_POSTS_BY_USERID);

route.post('/', auth, fileUpload.single('image'), [
    body('title').trim().isLength({min:5}).withMessage('Title must be atleast 5 characters long.'),
    body('description').trim().isLength({min: 10}).withMessage('Description must be atleast 10 characters long.')
], postsController.CREATE_NEW_POST);

route.patch('/:postId/:userId/like', auth, postsController.LIKE_POST);

route.patch('/:postId/:userId/unlike', auth, postsController.UNLIKE_POST);

route.patch('/:postId', auth, [
    body('title').trim().isLength({min:5}).withMessage('Title must be atleast 5 characters long.'),
    body('description').trim().isLength({min: 10}).withMessage('Description must be atleast 10 characters long.')
] ,postsController.UPDATE_POST);

route.delete('/:postId', auth, postsController.DELETE_POST);

module.exports = route;