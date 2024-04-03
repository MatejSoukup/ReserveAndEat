const Ajv = require("ajv")

const categoryDao = require("../../dao/category/categoryDao")

const ajv = new Ajv()
const dao = new categoryDao()

const categorySchema = {
    type: "object",
    properties: {
      id: {type: "string"},
      name: { type: "string" },
    },
    required: ["id","name"],
    additionalProperties: false,
  };
  

async function updateAbl(req , res){
    try {
        const category = req.body;

        const valid = ajv.validate(categorySchema , category)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const updatedCategory = await dao.update(category)

        if (!updatedCategory) {
            res.status(404).json({
              code: "eventNotFound",
              message: `Event ${category.id} not found`,
            });
            return;
          }

        res.json(updatedCategory)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = updateAbl;