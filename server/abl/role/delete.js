const Ajv = require("ajv")

const roleDao = require("../../dao/role/roleDao")

const ajv = new Ajv()
const dao = new roleDao()

const schema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
  };
  

async function deleteAbl(req , res){
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

        dao.delete(reqParams.id)
        res.json({}); 

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = deleteAbl;