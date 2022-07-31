const mongoose= require('mongoose');
const Schema = mongoose.Schema

const StudentSchema =new Schema({
    firstname:{type: String},
    lastname:{type: String},
    email:{type: String},
    password:{type: String}
});

const studentdb= mongoose.model('studentdb',StudentSchema);

module.exports= studentdb;