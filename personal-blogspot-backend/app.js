const express = require('express')
const app = express();
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ErrorHandling = require('./models/error-handling');
const fs = require('fs');
const port = process.env.PORT || 5000

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);

app.use((req,res,next)=> {
    return next(new ErrorHandling('Specified route does not exist.', 404));
})

app.use((error,req,res,next)=> {
    if(req.file) {
        fs.unlink(req.file.path, (err)=> {
            err && console.log(err);   
        })
    }
    const message = error.message || 'Unknown error occured';
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({message})
})

mongoose.connect(config.get('mongoURI'), {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("Server is listening on port " + port);
    app.listen(port);
}).catch((err)=> {
    console.log(err);
})
