const express = require("express");
const router = express.Router();

//Abl require
const {list, getById} = require("../abl/categoryAbl");

router.get("/get", (req, res) => {
    if (req.query.hasOwnProperty('id')) {
        console.log(req.query)
        getById(req, res)
    }else{
        res.status(400).json({ error: 'Missing ID parameter' });
    }

});

router.get("/list", (req, res) => {
    list(req, res);
})


module.exports = router;