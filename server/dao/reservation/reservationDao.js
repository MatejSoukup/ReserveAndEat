const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_DIR_PATH = path.join(__dirname,"..","..", "storage" , "reservation");

async function writeFile(reservation, path){
    const fileData = JSON.stringify(reservation);
       await fs.promises.writeFile(path, fileData , "utf-8");
}

class reservationDao{ 

    async get(reservationId){
        try {
          const reservation = await fs.promises.readFile(
            DEFAULT_DIR_PATH + `/${reservationId}.json`, "utf-8"
            );
            
            return JSON.parse(reservation);

        } catch (error) {
            if (error.code === "ENOENT") return null;
            throw { code: "failedToReadReservation", message: error.message };
        }

    }

    async create(reservation){
        try {
            reservation.id = crypto.randomBytes(16).toString("hex");

            await writeFile(reservation,DEFAULT_DIR_PATH + `/${reservation.id}.json`);
    
            return reservation;

        } catch (error) {
            throw { code: "failedToCreateReservation", message: error.message };
        }   
    }

    async update(reservation){
        try {
            const currentReservation = await this.get(reservation.id)
            if(!currentReservation.id) return null;

            const updatedReservation = {...currentReservation, ...reservation}
            
            await writeFile(updatedReservation, DEFAULT_DIR_PATH + `/${reservation.id}.json`);

            return updatedReservation

        } catch (error) {
            throw { code: "failedToUpdateReservation", message: error.message };
        }
    }

    async delete(reservationId){
        try {
            const filePath = path.join(DEFAULT_DIR_PATH, `/${reservationId}.json`)

            await fs.promises.unlink(filePath)

            return {};

        } catch (error) {
            if (error.code === "ENOENT") {
                return {};
              }
              throw { code: "failedToRemoveReservation", message: error.message };
        }
    }

    async list(){
        try {
            const files = await fs.promises.readdir(DEFAULT_DIR_PATH);
            const reservationList = files.map((file) => {
                const fileData = fs.readFileSync(
                  path.join(DEFAULT_DIR_PATH, file),
                  "utf8"
                );
                return JSON.parse(fileData);
              });

              return reservationList;

        } catch (error) {
            throw { code: "failedToListReservations", message: error.message };
        }
    }
}

module.exports = reservationDao;