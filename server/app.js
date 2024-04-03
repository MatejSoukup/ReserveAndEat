const express = require('express')
const app = express()
const port = 8000

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

//Controller require
const categoryController = require("./controllers/categoryController")
const roleController = require("./controllers/roleController")
const userController = require("./controllers/userController")

//Controller use

app.use("/category" , categoryController)
app.use("/role", roleController)
app.use("/user" , userController)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})