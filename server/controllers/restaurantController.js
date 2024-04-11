const express = require("express");
const router = express.Router();

//Abl require
const createAbl = require("../abl/restaurant/create")
const updateAbl = require("../abl/restaurant/update")
const getAbl = require("../abl/restaurant/get");
const listAbl = require("../abl/restaurant/list");    
const deleteAbl = require("../abl/restaurant/delete");

router.post("/create", (req, res) => {
    createAbl(req , res)
});

router.post("/update", (req, res) =>{
    updateAbl(req , res);
})

router.get("/get" , (req, res) => {
    getAbl(req , res)
});

router.get("/list", (req , res) => {
    listAbl(req , res)
});

router.delete("/delete", (req ,res) => {
    deleteAbl(req , res)
})

module.exports = router;