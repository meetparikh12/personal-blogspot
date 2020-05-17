const jwt = require('jsonwebtoken');
const ErrorHandling = require('../models/error-handling');
const config = require('config');

module.exports = (req,res,next) => {
    const header = req.get('Authorization');
    let token;
    if(!header) {
        return next(new ErrorHandling('Not Authorized', 401));
    } else {
        token = header.split(' ')[1];
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token,config.get('secretKey'));
    }catch(err) {
        return next(new ErrorHandling('Not Authorized', 401))
    }
    if(!decodedToken) {
            return next(new ErrorHandling('Not Authorized', 401))        
    }
    req.userId = decodedToken.userId;
    next();
}