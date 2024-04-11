const Ajv = require("ajv")

const restaurantDao = require("../../dao/restaurant/restaurantDao")

const ajv = new Ajv()
const dao = new restaurantDao()

const defaultRoleId = "ec3e330b0c8ddfe9472ab1cdcef6ebf3";

const restaurantSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      address: { type: "string" },
      email: { type: "string" },
      website: { type: "string" },
      phone: {type: "string"},
      shortDescription: {type: "string"},
      description: {type: "string"},
      openingHours: {type: "string"},
      categoryId: {type: "string"},
      userId: {type: "string"}
    },
    required: ["name","address","userId"],
    additionalProperties: false,
  };
  

async function createAbl(req , res){
    try {
        let restaurant = req.body;

        if(!restaurant.roleId){
            restaurant.roleId = defaultRoleId;
        }

        
        const valid = ajv.validate(restaurantSchema , restaurant)
    
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        restaurant = await dao.create(restaurant)
        res.json(restaurant)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = createAbl;