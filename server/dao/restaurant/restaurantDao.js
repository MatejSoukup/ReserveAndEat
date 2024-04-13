const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_DIR_PATH = path.join(__dirname,"..","..", "storage" , "restaurant");

async function writeFile(restaurant, path){
    const fileData = JSON.stringify(restaurant);
       await fs.promises.writeFile(path, fileData , "utf-8");
}

class restaurantDao{ 

    async get(restaurantId){
        try {
          const restaurant = await fs.promises.readFile(
            DEFAULT_DIR_PATH + `/${restaurantId}.json`, "utf-8"
            );
            
            return JSON.parse(restaurant);

        } catch (error) {
            if (error.code === "ENOENT") return null;
            throw { code: "failedToReadRestaurant", message: error.message };
        }

    }

    async create(restaurant){
        try {
            restaurant.id = crypto.randomBytes(16).toString("hex");

            await writeFile(restaurant,DEFAULT_DIR_PATH + `/${restaurant.id}.json`);
    
            return restaurant;

        } catch (error) {
            throw { code: "failedToCreateRestaurant", message: error.message };
        }   
    }

    async update(restaurant){
        try {
            const currentRestaurant = await this.get(restaurant.id)
            if(!currentRestaurant.id) return null;

            const updatedRestaurant = {...currentRestaurant, ...restaurant}
            
            await writeFile(updatedRestaurant, DEFAULT_DIR_PATH + `/${restaurant.id}.json`);

            return updatedRestaurant

        } catch (error) {
            throw { code: "failedToUpdateRestaurant", message: error.message };
        }
    }

    async delete(restaurantId){
        try {
            const filePath = path.join(DEFAULT_DIR_PATH, `/${restaurantId}.json`)

            await fs.promises.unlink(filePath)

            return {};

        } catch (error) {
            if (error.code === "ENOENT") {
                return {};
              }
              throw { code: "failedToRemoveRestaurant", message: error.message };
        }
    }

    async list(){
        try {
            const files = await fs.promises.readdir(DEFAULT_DIR_PATH);
            const restaurantList = files.map((file) => {
                const fileData = fs.readFileSync(
                  path.join(DEFAULT_DIR_PATH, file),
                  "utf8"
                );
                return JSON.parse(fileData);
              });

              return restaurantList;

        } catch (error) {
            throw { code: "failedToListRestaurants", message: error.message };
        }
    }
}

module.exports = restaurantDao;