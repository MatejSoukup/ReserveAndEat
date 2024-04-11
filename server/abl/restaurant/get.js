const Ajv = require("ajv")

const restaurantDao = require("../../dao/restaurant/restaurantDao")
const roleDao = require("../../dao/role/roleDao")

const ajv = new Ajv()
const dao = new restaurantDao()
const daoRole = new roleDao()

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

        let restaurant = await dao.get(reqParams.id);
        restaurant.role = await daoRole.get(restaurant.roleId)
        if(!restaurant){
            res.status(404).json({
                code: "restaurantNotFound",
                message: `Restaurant ${reqParams.id} not found`,
              });
            return;
        }

        res.json(restaurant); 

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = getAbl;