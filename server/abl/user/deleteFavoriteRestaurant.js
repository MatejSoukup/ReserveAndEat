const Ajv = require("ajv")

const userDao = require("../../dao/user/userDao")

const ajv = new Ajv()
const dao = new userDao()

const defaultRoleId = "ec3e330b0c8ddfe9472ab1cdcef6ebf3";

const schema = {
    type: "object",
    properties: {
      id: { type: "string" },
      restaurantId: {type: "string"},
    },
    required: ["id", "restaurantId"],
    additionalProperties: false,
};

async function deleteFavoriteRestaurantAbl(req , res){
    try {
        const reqParams = req.query?.id && req.query?.restaurantId ? req.query : req.body;


        const valid = ajv.validate(schema , reqParams)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        let user = await dao.get(reqParams.id);

        if(!user.favoriteRestaurants){
            user.favoriteRestaurants = []
        }

        const restaurantIsFavorite = user.favoriteRestaurants.some((restaurant) => restaurant === reqParams.restaurantId);

        if (!restaurantIsFavorite) {
            res.status(400).json({
                code: "restaurantAlreadyFavorite",
                message: `Restaurant with id ${reqParams.restaurantId}  isn't favorite`,
            });
            return;
        }       

        user.favoriteRestaurants = user.favoriteRestaurants.filter(restaurant => restaurant !== reqParams.restaurantId)

        dao.update(user);

        res.json(user);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = deleteFavoriteRestaurantAbl;