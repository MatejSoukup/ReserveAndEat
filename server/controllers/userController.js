const express = require("express");
const router = express.Router();

//Abl require
const createAbl = require("../abl/user/create")
const getAbl = require("../abl/user/get");

const updateAbl = require("../abl/user/update")
const listAbl = require("../abl/user/list");    
const deleteAbl = require("../abl/user/delete");


router.post("/create", (req, res) => {
    createAbl(req , res)
});



router.get("/get" , (req, res) => {
    getAbl(req , res)
});


router.post("/update", (req, res) =>{
    updateAbl(req , res);
})

router.get("/list", (req , res) => {
    listAbl(req , res)
});

router.delete("/delete", (req ,res) => {
    deleteAbl(req , res)
})

module.exports = router;