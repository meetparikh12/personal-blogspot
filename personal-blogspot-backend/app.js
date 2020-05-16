const express = require('express')
const app = express();

const port = process.env.PORT || 5000

app.use('/', (req,res,next)=> {
    console.log("Through middleware!");
    next();
})
app.get('/', (req,res,next)=> {
    res.send("Hello");
})
console.log("Server is listening on port " +port)
app.listen(port);
