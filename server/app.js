const express = require('express')
const app = express()
const port = 8000

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

//Controller require
const categoryController = require("./controllers/categoryController")
const roleController = require("./controllers/roleController")
const userController = require("./controllers/userController")
const restaurantController = require("./controllers/restaurantController")
const reservationController = require("./controllers/reservationController")

//Controller use

app.use("/category" , categoryController);
app.use("/role", roleController);
app.use("/user" , userController);
app.use("/restaurant", restaurantController);
app.use("/reservation", reservationController);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})