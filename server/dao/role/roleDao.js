const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_DIR_PATH = path.join(__dirname,"..","..", "storage" , "role");

async function writeFile(role, path){
    const fileData = JSON.stringify(role);
       await fs.promises.writeFile(path, fileData , "utf-8");
}

class roleDao{ 

    async get(roleId){
        try {
          const role = await fs.promises.readFile(
            DEFAULT_DIR_PATH + `/${roleId}.json`, "utf-8"
            );
            
            return JSON.parse(role);

        } catch (error) {
            if (error.code === "ENOENT") return null;
            throw { code: "failedToReadRole", message: error.message };
        }

    }

    async create(role){
        try {
            role.id = crypto.randomBytes(16).toString("hex");

            await writeFile(role,DEFAULT_DIR_PATH + `/${role.id}.json`);
    
            return role;

        } catch (error) {
            throw { code: "failedToCreateRole", message: error.message };
        }   
    }

    async update(role){
        try {
            const currentRole = await this.get(role.id)
            if(!currentRole.id) return null;

            const updatedRole = {...currentRole, ...role}
            
            await writeFile(updatedRole, DEFAULT_DIR_PATH + `/${role.id}.json`);

            return updatedRole

        } catch (error) {
            throw { code: "failedToUpdateRole", message: error.message };
        }
    }

    async delete(roleId){
        try {
            const filePath = path.join(DEFAULT_DIR_PATH, `/${roleId}.json`)

            await fs.promises.unlink(filePath)

            return {};

        } catch (error) {
            if (error.code === "ENOENT") {
                return {};
              }
              throw { code: "failedToRemoveRole", message: error.message };
        }
    }

    async list(){
        try {
            const files = await fs.promises.readdir(DEFAULT_DIR_PATH);
            const roleList = files.map((file) => {
                const fileData = fs.readFileSync(
                  path.join(DEFAULT_DIR_PATH, file),
                  "utf8"
                );
                return JSON.parse(fileData);
              });

              return roleList;

        } catch (error) {
            throw { code: "failedToListRoles", message: error.message };
        }
    }




}

module.exports = roleDao;