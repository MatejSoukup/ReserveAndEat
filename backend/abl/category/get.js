const Ajv = require("ajv")

const categoryDao = require("../../dao/category/categoryDao")

const ajv = new Ajv()
const dao = new categoryDao()

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

        const category = await dao.get(reqParams.id);
        if(!category){
            res.status(404).json({
                code: "categoryNotFound",
                message: `Category ${reqParams.id} not found`,
              });
            return;
        }

        res.json(category); 

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = getAbl;