const Ajv = require("ajv")

const roleDao = require("../../dao/role/roleDao")

const ajv = new Ajv()
const dao = new roleDao()

const roleSchema = {
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
        const role = req.body;

        const valid = ajv.validate(roleSchema , role)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const updatedRole = await dao.update(role)

        if (!updatedRole) {
            res.status(404).json({
              code: "eventNotFound",
              message: `Event ${role.id} not found`,
            });
            return;
          }

        res.json(updatedRole)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = updateAbl;