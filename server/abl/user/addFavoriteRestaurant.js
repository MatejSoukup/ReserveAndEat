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

async function addFavoriteRestaurantAbl(req , res){
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
        if(!user){
            res.status(404).json({
                code: "userNotFound",
                message: `User ${reqParams.id} not found`,
              });
            return;
        }

        if(!user.favoriteRestaurants){
            user.favoriteRestaurants = []
        }

        const restaurantIsFavorite = user.favoriteRestaurants.some((restaurant) => restaurant === reqParams.restaurantId);

        if (restaurantIsFavorite) {
            res.status(400).json({
                code: "restaurantAlreadyFavorite",
                message: `Restaurant with id ${reqParams.restaurantId} is already favorite`,
            });
            return;
        }       

        user.favoriteRestaurants.push(reqParams.restaurantId)

        dao.update(user);

        res.json(user);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = addFavoriteRestaurantAbl;