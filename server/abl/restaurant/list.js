const restaurantDao = require("../../dao/restaurant/restaurantDao");

const dao = new restaurantDao()

async function listAbl(req , res){
    try {
        const filters = req.body

        let restaurantList = await dao.list()

        if(filters.userId){
            restaurantList = restaurantList.filter(item => item.userId === filters.userId)
        }else{
            if(filters.city){
                restaurantList = restaurantList.filter(item => item.address.city === filters.city)
            }
            if(filters.categoryId){
                
                restaurantList = restaurantList.filter(item => item.categoryId === filters.categoryId)
            } 
        }


        res.json(restaurantList);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = listAbl;