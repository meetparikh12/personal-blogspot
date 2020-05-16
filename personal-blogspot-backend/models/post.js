const mongoose = require('mongoose');
const postScehma = new mongoose.Schema({
    
    title: {
        required: true,
        type: String
    },

    description: {
        type: String,
        required: true
    },
    // image: {
    //     type: String
    // }, 

    creator: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postScehma);