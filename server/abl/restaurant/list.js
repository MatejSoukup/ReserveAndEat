const restaurantDao = require("../../dao/restaurant/restaurantDao");

const dao = new restaurantDao()

async function listAbl(req , res){
    try {
        const restaurantList = await dao.list()

        res.json(restaurantList);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = listAbl;