const Ajv = require("ajv")

const userDao = require("../../dao/user/userDao")

const ajv = new Ajv()
const dao = new userDao()

const defaultRoleId = "ec3e330b0c8ddfe9472ab1cdcef6ebf3";

const userSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      surname: { type: "string" },
      email: { type: "string" },
      roleId: { type: "string" , default: defaultRoleId },
    },
    required: ["id","name","surname","email"],
    additionalProperties: false,
};
  

async function updateAbl(req , res){
    try {
        const user = req.body;

        const valid = ajv.validate(userSchema , user)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        //Checking for email duplication
        const userList = await dao.list();
        const emailExists = userList.some((u) => u.email === user.email);
    
        if (emailExists) {
            res.status(400).json({
                code: "emailAlreadyExists",
                message: `User with email ${user.email} already exists`,
            });
            return;
        }    

        const updatedUser = await dao.update(user)

        if (!updatedUser) {
            res.status(404).json({
              code: "eventNotFound",
              message: `Event ${user.id} not found`,
            });
            return;
          }

        res.json(updatedUser)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = updateAbl;