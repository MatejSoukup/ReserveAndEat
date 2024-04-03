const categoryDao = require("../../dao/category/categoryDao");

const dao = new categoryDao()

async function listAbl(req , res){
    try {
        const categoryList = await dao.list()

        res.json(categoryList);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = listAbl;