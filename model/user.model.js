const mongoose = require("mongoose");
// user schema
const userSchema = mongoose.Schema({
    email: String,
    password: String,
    confirm_password: String,
    name:String
},
{
    versionKey:false
})

// model 
const UserModel = mongoose.model("user", userSchema)
module.exports = {
    UserModel
}