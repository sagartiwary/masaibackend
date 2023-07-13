const express = require("express")
const app = express();
const { connection } = require("./db/db");
const { userRoute } = require("./route/user.route");
const { employeeRoute } = require("./route/employee.route");
require("dotenv").config()
const port = process.env.PORT
app.use(express.json());
app.use("/users", userRoute)
app.use("/employee",employeeRoute)


app.listen(port, async (req, res) => {
    try {
        await connection;
        console.log("db is connected")
        console.log(`it is running port ${port}`)
    } catch (error) {
        console.log("something wrong with this url")
    }
})