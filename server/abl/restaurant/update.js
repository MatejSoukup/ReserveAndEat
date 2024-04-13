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
      address: {
        type: "object",
        properties: {
            city: { type: "string" },
            street: { type: "string" },
            country: { type: "string" }
        },
        required: ["city", "street", "country"]
      },
      email: { type: "string" },
      website: { type: "string" },
      phone: {type: "string"},
      shortDescription: {type: "string"},
      description: {type: "string"},
      openingHours: {type: "string"},
      categoryId: {type: "string"},
      userId: {type: "string"}
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

        const updatedRestaurant = await dao.update(restaurant)

        if (!updatedRestaurant) {
            res.status(404).json({
              code: "restaurantNotFound",
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