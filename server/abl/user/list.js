const userDao = require("../../dao/user/userDao");

const dao = new userDao()

async function listAbl(req , res){
    try {
        const userList = await dao.list()

        res.json(userList);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = listAbl;