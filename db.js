const mongoose = require('mongoose');

const database=() =>{
    mongoose.connect('mongodb://localhost:27017/students', function(req, res){
        console.log("mongoose connected")
    })
} 

module.exports = database