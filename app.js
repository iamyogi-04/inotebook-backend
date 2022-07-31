const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const database = require('./db');
const bodyParser = require('body-parser')
const cors = require('cors');
const Port = 5000;

//database
database();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());



//routes
app.use('/api', require('./routes/StudentRoute'))
app.use('/api',require('./routes/BookRoute'))

app.listen(Port,()=>{
    console.log(`server listening on ${Port}`);
})