const Ajv = require("ajv")

const userDao = require("../../dao/user/userDao")

const ajv = new Ajv()
const dao = new userDao()

const defaultRoleId = "ec3e330b0c8ddfe9472ab1cdcef6ebf3";

const userSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      surname: { type: "string" },
      email: { type: "string" },
      roleId: { type: "string" , default: defaultRoleId },
    },
    required: ["name","surname","email"],
    additionalProperties: false,
  };
  

async function createAbl(req , res){
    try {
        let user = req.body;

        if(!user.roleId){
            user.roleId = defaultRoleId;
        }

        
        const valid = ajv.validate(userSchema , user)
    
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

    const userList = await dao.list();
    const emailExists = userList.some((u) => u.email === user.email);

    if (emailExists) {
        res.status(400).json({
            code: "emailAlreadyExists",
            message: `User with email ${user.email} already exists`,
        });
        return;
    }

        user = await dao.create(user)
        res.json(user)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = createAbl;