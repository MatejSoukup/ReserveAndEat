const Ajv = require("ajv")

const categoryDao = require("../../dao/category/categoryDao")

const ajv = new Ajv()
const dao = new categoryDao()

const categorySchema = {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
  };
  

async function createAbl(req , res){
    try {
        let category = req.body;

        const valid = ajv.validate(categorySchema , category)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        category = await dao.create(category)
        res.json(category)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = createAbl;