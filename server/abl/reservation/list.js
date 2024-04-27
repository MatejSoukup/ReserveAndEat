const reservationDao = require("../../dao/reservation/reservationDao");
const restaurantDao = require("../../dao/restaurant/restaurantDao");
const userDao = require("../../dao/user/userDao");

const dao = new reservationDao();
const daoUser = new userDao();
const daoRestaurant = new restaurantDao();

async function listAbl(req, res) {
  try {
    const filters = {
      userId: req.query.userId,
      restaurantId: req.query.restaurantId,
    };

    let reservationList = await dao.list();

    if (filters.userId) {
      reservationList = reservationList.filter(
        (item) => item.userId === filters.userId
      );
    } else if (filters.restaurantId) {
      reservationList = reservationList.filter(
        (item) => item.restaurantId === filters.restaurantId
      );
    }

    //Mapping user and restaurant
    reservationList = await Promise.all(
      reservationList.map(async (reservation) => {
        reservation.user = await daoUser.get(reservation.userId);
        reservation.restaurant = await daoRestaurant.get(
          reservation.restaurantId
        );
        return reservation;
      })
    );

    res.json(reservationList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = listAbl;