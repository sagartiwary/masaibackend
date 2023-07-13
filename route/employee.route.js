
const express = require('express');
const { auth } = require('../middleware/authentication.middle');
const { EmployeeModel } = require('../model/employee.model');
const employeeRoute = express.Router();
// employeeRoute.use(authentication);


employeeRoute.post("/add", auth, async (req, res) => {
    try {
        let newPost = new EmployeeModel(req.body);
        await newPost.save();
        res.status(200).json({ msg: "new Post has been added", newPost });
    } catch (error) {
        res.status(400).json({ msg: "PLease login first" });
    }
});


employeeRoute.get("/",auth, async (req, res) => {
    try {
        await EmployeeModel.find({ userID: req.body.userID });
        res.status(200).json({ msg: "Visible Post" });
    } catch (error) {
        res.status(400).json({ msg: "PLease login first" });
    }
});

employeeRoute.patch("/update/:employeeID", async (req, res) => {
    const userDocId = req.body.userID;
    try {
        const { employeeID } = req.params;
        const post = await EmployeeModel.findOne({ _id: employeeID });
        const postDocId = post.userID;
        if (userDocId === postDocId) {
            await EmployeeModel.findByIdAndUpdate(
                { _id: employeeID },
                req.body
            );
            res.status(200).json({ msg: "post has been updated" });
        } else {
            res.status(400).json({ msg: "Please Login" });
        }
    } catch (error) {
        res.status(400).json({ msg: "PLease login first" });
    }
});


employeeRoute.delete("/delete/:employeeID", async (req, res) => {
    const userDocId = req.body.userID;
    try {
        const { employeeID } = req.params;
        const post = await EmployeeModel.findOne({ _id: employeeID });
        const postDocId = post.userID;
        if (userDocId === postDocId) {
            let updatedPost = await EmployeeModel.findByIdAndDelete({ _id: employeeID });
            res.status(200).json({ msg: "post has been deleted" });
        } else {
            res.status(400).json({ msg: "Please Login" });
        }

    } catch (error) {
        res.status(400).json({ msg: "PLease login first" });
    }
});




module.exports = {
    employeeRoute
}