const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const decoded = jwt.verify(token, "sagar");
        if (decoded) {
            req.body.userID = decoded.userID;
            req.body.user = decoded.user;
            next();
            // res.status(200).json({msg:"token authorized"})
        } else {
            res.status(400).json({ msg: "Please login" });
        }
    } else {
        res.status(400).json({ msg: "Please login" });
    }
};

module.exports = {
    auth,
};