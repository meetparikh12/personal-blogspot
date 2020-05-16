const express = require('express')
const route = express.Router();

route.get('/', (req,res,next)=> {
    res.send('From GET / users');
})

module.exports = route;