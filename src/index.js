const express = require('express')
const app = express()
const userController = require("./controllers/users.controllers")
app.use(express.json())
app.use("/users", userController)
module.exports = app;