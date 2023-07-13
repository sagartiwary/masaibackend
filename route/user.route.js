
const express = require('express');
const userRoute = express.Router();
const { UserModel } = require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//register


userRoute.post("/register", async (req, res) => {
    const { email, password, confirm_password } = req.body;

    const existedUser = await UserModel.findOne({ email })
    try {
        if (existedUser) {
            res.status(200).json({ msg: "User already exits, Please login" })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ error: err })
                } else {
                    let newUser = new UserModel({
                        email,
                        password: hash,
                        confirm_password: hash
                    })
                    await newUser.save()
                    res.status(200).json({ msg: "new user has been added" });
                }
            })
        }
    } catch (error) {
        res.status(400).json({ error: err })
    }
})


//login

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let registeredUser = await UserModel.findOne({ email });
    if (registeredUser) {
        try {
            bcrypt.compare(password, registeredUser.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { userID: registeredUser._id, user: registeredUser.name },
                        "sagar"
                    );
                    res.status(200).json({ msg: "Loggin Successful", token: token });
                } else {
                    res.status(400).json({ error: "something wrong" });
                }
            });
        } catch (error) {
            res.status(400).json({ err: error.message });
        }
    } else {
        res.status(200).json({ msg: "Please Loggin " });
    }
});

module.exports = {
    userRoute
}