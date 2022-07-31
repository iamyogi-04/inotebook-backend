const mongoose= require('mongoose');
const Schema = mongoose.Schema

const BookSchema =new Schema({
    userid:{type: String},
    bookname:{type: String,required:true},
    author:{type: String},
    borrowedby:{type: String},
    dateofborrow:{type: String,default:Date.now()},
    expectedreturns:{type: String},
});

const bookdb= mongoose.model('bookdb',BookSchema);

module.exports= bookdb;