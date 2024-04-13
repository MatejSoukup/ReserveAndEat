const express = require("express");
const router = express.Router();

//Abl require
const createAbl = require("../abl/reservation/create")
const updateAbl = require("../abl/reservation/update")
const listAbl = require("../abl/reservation/list");    

//
router.post("/create", (req, res) => {
    createAbl(req , res)
});
//
router.post("/update", (req, res) =>{
    updateAbl(req , res);
})
//:TODO
//by restid + user id
router.get("/list", (req , res) => {
    listAbl(req , res)
});


module.exports = router;