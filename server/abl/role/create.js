const Ajv = require("ajv")

const roleDao = require("../../dao/role/roleDao")

const ajv = new Ajv()
const dao = new roleDao()

const roleSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
  };
  

async function createAbl(req , res){
    try {
        let role = req.body;

        const valid = ajv.validate(roleSchema , role)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        role = dao.create(role)
        res.json(role)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = createAbl;