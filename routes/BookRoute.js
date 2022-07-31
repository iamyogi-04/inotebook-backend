const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bookdb = require("../models/books");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY;
const studentdb = require("../models/student");

//get history

router.get('/getdata/:id', async (req, res) => {
    try {
        const result = await bookdb.find({ userid: req.params.id });
        // console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(' Internal server error');
    }
});

//add book

router.post('/adddata/:id', async (req, res) => {


    try {
        const date1 = new Date();
        let day = date1.getDate();

        let month = date1.getMonth() + 1;
        let year = date1.getFullYear();
        let date2 = "";
        date2 += year + "-" + month + "-" + day;
        date2 = date2.split("-").reverse().join("-")
        const addingNewOrder = new bookdb({ ...req.body, dateofborrow: date2, userid: req.params.id });

        await addingNewOrder
            .save()
            .then((data) => {
                console.log(data);
                // console.log(req.user);
            })
            .catch((err) => {
                console.log(err);
            });

        res.status(200).json({
            data: 'saved',
        });
    } catch (err) {
        // console.log(err)
        res.send('error adding data ');
    }
});

//update history

router.put('/updatedata/:id', async function (req, res) {

    const { bookname, author, borrowedby, expectedreturns } = req.body;
    try {
        const newpost = {};
        if (bookname) {
            newpost.bookname = bookname;
        } if (author) {
            newpost.author = author;
        } if (borrowedby) {
            newpost.borrowedby = borrowedby;
        } if (expectedreturns) {
            newpost.expectedreturns = expectedreturns;
        }
        let post = await bookdb.findById(req.params.id);
        post = await bookdb.findByIdAndUpdate(req.params.id, { $set: newpost }, { new: true });
        res.json(newpost);

    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Error updating post");
    }
})


//update student details
router.put('/updatestudent/:id', async function (req, res) {

    const { firstname, lastname } = req.body;
    try {
        const newpost = {};
        if (firstname) {
            newpost.firstname = firstname;
        } if (lastname) {
            newpost.lastname = lastname;
        }
        let post = await studentdb.findById(req.params.id);

        if (post) {
            let post1 = await studentdb.findByIdAndUpdate(req.params.id, { $set: newpost }, { new: true });
            res.status(200).json({
                status: "success",
                data: post1,
                data2: post,
            });
        };
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Error updating post");
    }
})
//get student data
router.get('/getstudentdata/:id', async (req, res) => {
    try {
        const result = await studentdb.find({ _id: req.params.id });
        //   console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(' Internal server error');
    }
});

module.exports = router;
