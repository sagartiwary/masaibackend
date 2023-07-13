const mongoose = require("mongoose");
// user schema
const employeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    department: String,
    salary: Number,
    userID: String,
    user: String,
},
    {
        versionKey: false
    })

// model 
const EmployeeModel = mongoose.model("masaiEmployee", employeeSchema)
module.exports = {
    EmployeeModel
}