const Post = require('../models/post');
const ErrorHandling = require('../models/error-handling');
const mongoose = require('mongoose');
const User = require('../models/user');
const {validationResult}= require('express-validator');
const fs = require('fs');

exports.GET_ALL_POSTS = async (req, res, next) => {
    let posts;
    try {
        posts = await Post.find().populate('creator', 'name');
    } catch (err) {
        return next(new ErrorHandling('Posts not fetched', 500));
    }
    if (!posts || posts.length === 0) {
        return next(new ErrorHandling('No posts found', 404))
    }
    
    res.status(200).json({
        posts: posts.map((post)=> {
            return {
            _id: post._id,
            description: post.description,
            createdAt: post.createdAt,
            creator: post.creator.name,
            image: post.image,
            title: post.title,
            updatedAt: post.updateAt
            }
        })
    })
}

exports.GET_POST_BY_POSTID = async (req, res, next) => {
    let post;
    const postId = req.params.postId;
    try {
        post = await Post.findById(postId).populate('creator');
    } catch (err) {
        console.log(err);
        return next(new ErrorHandling('Posts not fetched', 500));
    }
    if (!post) {
        return next(new ErrorHandling('No post found', 404))
    }
    res.status(200).json({
        post: {
            _id: post._id,
            image: post.image,
            createdAt: (new Date(post.createdAt).toDateString()).substr(4),
            title: post.title,
            description: post.description,
            creator: {
                id: post.creator._id,
                name: post.creator.name
            },
            likes: post.likes.length
        }
    });
}

exports.GET_POSTS_BY_USERID = async (req, res, next) => {
    let posts;
    try {
        posts = await Post.find({
            creator: req.params.userId
        }).populate('creator','name')
    } catch (err) {
        console.log(err);
        return next(new ErrorHandling('Posts not fetched', 500));
    }
    if (!posts || posts.length === 0) {
        return next(new ErrorHandling('Posts not found', 404))
    }
    res.status(200).json({
        posts: posts.map((post) => {
            return {
                _id: post._id,
                description: post.description,
                createdAt: post.createdAt,
                creator: post.creator.name,
                image: post.image,
                title: post.title,
                updatedAt: post.updateAt,
            }
        })
    });
}

exports.CREATE_NEW_POST = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        error.statusCode = 422;
        error.message = error.array()
        return next(error);
    }
    const {
        title,
        description
    } = req.body;
    let user;
    try {
        user = await User.findById(req.userId);
    } catch (err) {
        return next(new ErrorHandling('User not fetched', 500))
    }
    if (!user) {
        return next(new ErrorHandling('User not found', 404))
    }
    let imageUrl = req.file.path;
    imageUrl = imageUrl.replace(/\\/g, "/");
    const post = new Post({
        title,
        description,
        creator: req.userId,
        image: imageUrl
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.save({
            session
        });
        await user.posts.unshift(post);
        await user.save({
            session
        });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return next(new ErrorHandling('Post not created', 500))
    }

    res.status(201).json({
        message: 'Blog created successfully!'
    });
}

exports.UPDATE_POST = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        error.statusCode = 422;
        error.message = error.array()
        return next(error);
    }
    let post;
    try {
        post = await Post.findById(req.params.postId);
    } catch (err) {
        console.log(err);
        return next(new ErrorHandling('Post not fetched', 500));
    }
    if (!post) {
        return next(new ErrorHandling('Post not found', 404));
    }

    if (post.creator.toString() !== req.userId) {
        return next(new ErrorHandling('Not Authorized', 401));
    }

    const {
        title,
        description
    } = req.body;
    post.title = title;
    post.description = description;
    try {
        await post.save();
    } catch (err) {
        console.log(err);

        return next(new ErrorHandling('Post not updated', 404));
    }
    res.status(200).json({
        post
    });
}

exports.DELETE_POST = async (req, res, next) => {
    const postId = req.params.postId;
    let post;
    try {
        post = await Post.findById(postId).populate('creator');
    } catch (err) {
        return next(new ErrorHandling('Post not fetched', 500));
    }
    if (!post) {
        return next(new ErrorHandling('Post not found', 404));
    }
    if(post.creator._id.toString() !== req.userId){
        return next(new ErrorHandling('Not Authorized', 401));
    }
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.creator.posts.pull(post);
        await post.creator.save({
            session
        });
        //      await Post.deleteOne({_id: postId});
        await post.remove({
            session
        });
        await session.commitTransaction();

    } catch (err) {
        return next(new ErrorHandling('Post not deleted', 500))
    }
    
    fs.unlink(post.image, (err)=> {
        err && console.log(err);
        !err && console.log('File deleted');
    });
    
    res.status(200).json({
        message: 'Post deleted successfully.'
    })
}

exports.LIKE_POST = async (req,res,next)=> {
    const {userId, postId} = req.params;
    let post;
    try {
        post = await Post.findById(postId);
    } catch(err){
        return next(new ErrorHandling('Post not fetched', 500));
    }
    if(!post){
        return next(new ErrorHandling('Post not found', 404));
    }
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return next(new ErrorHandling('User not fetched', 500));
    }
    if (!user) {
        return next(new ErrorHandling('User not found', 404));
    }
    if(user._id.toString() !== req.userId){
        return next(new ErrorHandling('Sorry, Not Authorized.', 401))
    }
    let isPostLiked;
    try {
        isPostLiked = await post.likes.find((user)=> user.toString() === req.userId);
    } catch(err){
        return next(new ErrorHandling('Try again', 500))
    }
    if(isPostLiked){
        return next(new ErrorHandling('Post already liked', 409));
    } else {
        post.likes.unshift(user);
    }
    try {
        await post.save();
    }catch(err){
        return next(new ErrorHandling('Post not liked', 500));
    } 
    res.status(200).json({message: "Post Liked successfully", likes: post.likes.length});
}

exports.UNLIKE_POST = async (req,res,next)=> {
    const {userId, postId} = req.params;
    let post, user;
    try {
        post = await Post.findById(postId);
    }
    catch(err){
        return next(new ErrorHandling('Post not fetched', 500))
    }
    if(!post){
        return next(new ErrorHandling('Post not found', 404));
    }
    try {
        user = await User.findById(userId);
    }catch(err){
        return next(new ErrorHandling('User not fetched', 500))
    }
    if(!user){
        return next(new ErrorHandling('User not found', 404))
    }
    if(user._id.toString() !== req.userId){
        return next(new ErrorHandling('Sorry, Not Authorized', 401))
    }
    let isPostLiked;
    try {
        isPostLiked = await post.likes.find((user)=> user.toString() === req.userId);
        if (isPostLiked) {
            post.likes.pull(user);
            await post.save();
        } else if(!isPostLiked){
            return next(new ErrorHandling('You have not yet liked the post', 409))
        }
    }catch(err){
        return next(new ErrorHandling('Post not unliked', 500));
    }

    res.status(200).json({message: 'Post unliked successfully', likes: post.likes.length})
}