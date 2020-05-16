const express = require('express')
const Post = require('../models/post');
const ErrorHandling = require('../models/error-handling');
const route = express.Router();

route.get('/', (req, res, next) => {
    res.send('From GET / posts');
});

route.post('/', async (req,res,next)=> {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        creator: req.body.creator
    })
    try {
        await post.save();
    } catch(err) {
        console.log(err);
        return next(new ErrorHandling('Post not created', 500))
    }

    res.status(201).json({post});
})

module.exports = route;