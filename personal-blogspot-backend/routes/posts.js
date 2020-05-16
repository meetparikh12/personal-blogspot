const express = require('express')
const Post = require('../models/post');
const ErrorHandling = require('../models/error-handling');
const { v4: uuidv4 } = require('uuid');
const route = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

route.get('/', async (req, res, next) => {
    let posts; 
    try {
        posts = await Post.find();
    } catch(err) {
        return next(new ErrorHandling('Posts not fetched', 500));
    }
    if(!posts || posts.length === 0){
        return next(new ErrorHandling('No posts found', 404))
    } 
    res.status(200).json({posts})
});

route.get('/:postId', async (req, res, next) => {
    let post;
    const postId = req.params.postId;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        console.log(err);
        return next(new ErrorHandling('Posts not fetched', 500));
    }
    if (!post) {
        return next(new ErrorHandling('No post found', 404))
    }
    res.status(200).json({
        post
    });
})

route.get('/user/:userId', async (req,res,next)=> {
    let posts; 
    try {
         posts = await Post.find({creator: req.params.userId})
    } catch(err) {
        console.log(err);
        return next(new ErrorHandling('Posts not fetched', 500));
    }
    if(!posts || posts.length === 0) {
        return next(new ErrorHandling('Posts not found', 404))
    }
    res.status(200).json({posts});
})

route.post('/', async (req,res,next)=> {

    const { title, description, creator } = req.body;
    let user;
    try {
        user = await User.findById(creator);
    } catch(err) {
        return next(new ErrorHandling('User not fetched', 500))
    } 
    if(!user) {
        return next(new ErrorHandling('User not found', 404))
    }
    const post = new Post({
        title,
        description,
        creator
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.save({session});
        await user.posts.unshift(post);
        await user.save({session});
        await session.commitTransaction();
    } catch(err) {
        console.log(err);
        return next(new ErrorHandling('Post not created', 500))
    }

    res.status(201).json({post});
})

route.patch('/:postId', async (req,res,next)=> {
    let post;
    try {
        post = await Post.findById(req.params.postId);
    } catch(err) {
        console.log(err);
        return next(new ErrorHandling('Post not fetched', 500));
    }
    if(!post) {
        return next(new ErrorHandling('Post not found', 404));
    } 

    const { title, description} = req.body;
    post.title = title;
    post.description = description;
    try {
        await post.save();
    } catch(err) {
        console.log(err);
        
        return next(new ErrorHandling('Post not updated', 404));
    }
    res.status(200).json({post});
})

route.delete('/:postId', async (req,res,next)=> {
    const postId = req.params.postId;
    let post;
    try {
        post = await Post.findById(postId).populate('creator');
    } catch(err){
        return next(new ErrorHandling('Post not fetched', 500));
    } 
    if(!post) {
        return next(new ErrorHandling('Post not found', 404));
    } 

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.creator.posts.pull(post);
        await post.creator.save({session});
//      await Post.deleteOne({_id: postId});
        await post.remove({session});
        await session.commitTransaction();

    } catch(err) {
        return next(new ErrorHandling('Post not deleted', 500))
    } 
    res.status(200).json({message: 'Post deleted successfully.'})
})
module.exports = route;