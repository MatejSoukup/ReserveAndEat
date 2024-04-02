const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_DIR_PATH = path.join(__dirname,"..","..", "storage" , "category");

async function writeFile(category, path){
    const fileData = JSON.stringify(category);
       await fs.promises.writeFile(path, fileData , "utf-8");
}

class categoryDao{ 

    async get(categoryId){
        try {
          const category = await fs.promises.readFile(
            DEFAULT_DIR_PATH + `/${categoryId}.json`, "utf-8"
            );
            
            return JSON.parse(category);

        } catch (error) {
            if (error.code === "ENOENT") return null;
            throw { code: "failedToReadCategory", message: error.message };
        }

    }

    async create(category){
        try {
            category.id = crypto.randomBytes(16).toString("hex");

            await writeFile(category,DEFAULT_DIR_PATH + `/${category.id}.json`);
    
            return category;

        } catch (error) {
            throw { code: "failedToCreateCategory", message: error.message };
        }   
    }

    async update(category){
        try {
            const currentCategory = await this.get(category.id)
            if(!currentCategory.id) return null;

            const updatedCategory = {...currentCategory, ...category}
            
            await writeFile(updatedCategory, DEFAULT_DIR_PATH + `/${category.id}.json`);

            return updatedCategory

        } catch (error) {
            throw { code: "failedToUpdateCategory", message: error.message };
        }
    }

    async delete(categoryId){
        try {
            const filePath = path.join(DEFAULT_DIR_PATH, `/${categoryId}.json`)

            await fs.promises.unlink(filePath)

            return {};

        } catch (error) {
            if (error.code === "ENOENT") {
                return {};
              }
              throw { code: "failedToRemoveCategory", message: error.message };
        }
    }

    async list(){
        try {
            const files = await fs.promises.readdir(DEFAULT_DIR_PATH);
            const categoryList = files.map((file) => {
                const fileData = fs.readFileSync(
                  path.join(DEFAULT_DIR_PATH, file),
                  "utf8"
                );
                return JSON.parse(fileData);
              });

              return categoryList;

        } catch (error) {
            throw { code: "failedToListCategories", message: error.message };
        }
    }




}

module.exports = categoryDao;