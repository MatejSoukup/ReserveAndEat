const roleDao = require("../../dao/role/roleDao");

const dao = new roleDao()

async function listAbl(req , res){
    try {
        const roleList = await dao.list()

        res.json(roleList);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = listAbl;