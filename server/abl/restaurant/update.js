const Ajv = require("ajv")

const restaurantDao = require("../../dao/restaurant/restaurantDao")

const ajv = new Ajv()
const dao = new restaurantDao()

const defaultRoleId = "ec3e330b0c8ddfe9472ab1cdcef6ebf3";

const restaurantSchema = {
    type: "object",
    properties: {
      id: {type: "string"},
      name: { type: "string" },
      address: { type: "string" },
      email: { type: "string" },
      website: { type: "string" },
      phone: {type: "string"},
      shortDescription: {type: "string"},
      description: {type: "string"},
      openingHours: {type: "string"},
      categoryId: {type: "string"},
      restaurantId: {type: "string"}
    },
    required: ["name","address","restaurantId"],
    additionalProperties: false,
};

async function updateAbl(req , res){
    try {
        const restaurant = req.body;

        const valid = ajv.validate(restaurantSchema , restaurant)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        //Checking for email duplication
        const restaurantList = await dao.list();
        const emailExists = restaurantList.some((u) => u.email === restaurant.email);
    
        if (emailExists) {
            res.status(400).json({
                code: "emailAlreadyExists",
                message: `Restaurant with email ${restaurant.email} already exists`,
            });
            return;
        }    

        const updatedRestaurant = await dao.update(restaurant)

        if (!updatedRestaurant) {
            res.status(404).json({
              code: "eventNotFound",
              message: `Restaurant ${restaurant.id} not found`,
            });
            return;
          }

        res.json(updatedRestaurant)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = updateAbl;