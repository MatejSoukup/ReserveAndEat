const Ajv = require("ajv")

const userDao = require("../../dao/user/userDao")
const roleDao = require("../../dao/role/roleDao")
const restaurantDao = require("../../dao/restaurant/restaurantDao")

const ajv = new Ajv()
const dao = new userDao()
const daoRole = new roleDao()
const daoRestaurant = new restaurantDao()

const schema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
  };
  

async function getAbl(req , res){
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        const valid = ajv.validate(schema ,reqParams)
        if (!valid) {
            res.status(400).json({
              code: "dtoInIsNotValid",
              message: "dtoIn is not valid",
              validationError: ajv.errors,
            });
            return;
        }

        let user = await dao.get(reqParams.id);
        user.role = await daoRole.get(user.roleId)
        if(!user){
            res.status(404).json({
                code: "userNotFound",
                message: `User ${reqParams.id} not found`,
              });
            return;
        }

        const favoriteRestaurants = await Promise.all(user.favoriteRestaurants.map(async (restaurantId) => {
          const restaurant = await daoRestaurant.get(restaurantId);
          return restaurant;
        }));

        user.favoriteRestaurants = favoriteRestaurants;

        res.json(user); 

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = getAbl;