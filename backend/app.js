const express = require('express')
const app = express()
const port = 3000

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

//Controller require
const categoryController = require("./controllers/categoryController")
const roleController = require("./controllers/roleController")

//Controller use

app.use("/category" , categoryController)
app.use("/role" , roleController)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})