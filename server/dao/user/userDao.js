const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_DIR_PATH = path.join(__dirname,"..","..", "storage" , "user");

async function writeFile(user, path){
    const fileData = JSON.stringify(user);
       await fs.promises.writeFile(path, fileData , "utf-8");
}

class userDao{ 

    async get(userId){
        try {
          const user = await fs.promises.readFile(
            DEFAULT_DIR_PATH + `/${userId}.json`, "utf-8"
            );
            
            return JSON.parse(user);

        } catch (error) {
            if (error.code === "ENOENT") return null;
            throw { code: "failedToReadUser", message: error.message };
        }

    }

    async create(user){
        try {
            user.id = crypto.randomBytes(16).toString("hex");

            await writeFile(user,DEFAULT_DIR_PATH + `/${user.id}.json`);
    
            return user;

        } catch (error) {
            throw { code: "failedToCreateUser", message: error.message };
        }   
    }

    async update(user){
        try {
            const currentUser = await this.get(user.id)
            if(!currentUser.id) return null;

            const updatedUser = {...currentUser, ...user}
            
            await writeFile(updatedUser, DEFAULT_DIR_PATH + `/${user.id}.json`);

            return updatedUser

        } catch (error) {
            throw { code: "failedToUpdateUser", message: error.message };
        }
    }

    async delete(userId){
        try {
            const filePath = path.join(DEFAULT_DIR_PATH, `/${userId}.json`)

            await fs.promises.unlink(filePath)

            return {};

        } catch (error) {
            if (error.code === "ENOENT") {
                return {};
              }
              throw { code: "failedToRemoveUser", message: error.message };
        }
    }

    async list(){
        try {
            const files = await fs.promises.readdir(DEFAULT_DIR_PATH);
            const userList = files.map((file) => {
                const fileData = fs.readFileSync(
                  path.join(DEFAULT_DIR_PATH, file),
                  "utf8"
                );
                return JSON.parse(fileData);
              });

              return userList;

        } catch (error) {
            throw { code: "failedToListUsers", message: error.message };
        }
    }




}

module.exports = userDao;