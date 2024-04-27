const userDao = require("../../dao/user/userDao");
const restaurantDao = require("../../dao/restaurant/restaurantDao") // added this line

const dao = new userDao();
const daoRestaurant = new restaurantDao()

async function listAbl(req, res) {
    try {
      let userList = await dao.list();
  
      userList = await Promise.all(userList.map(async user => {
        if (user.favoriteRestaurants) {
          user.favoriteRestaurants = await Promise.all(user.favoriteRestaurants.map(async restaurantId => {
            const restaurant = await daoRestaurant.get(restaurantId);
            return restaurant;
          }));
        }
        return user;
      }));
      
      res.json(userList);
  
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = listAbl;