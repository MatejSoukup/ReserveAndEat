const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const reservationDao = require("../../dao/reservation/reservationDao")

const ajv = new Ajv()
const dao = new reservationDao()

addFormats(ajv, ["date", "iso-time"]);

const reservationSchema = {
    type: "object",
    properties: {
        numberOfPeople: { type: "integer" },
        date: { type: "string", format:"date" },
        time: { type: "string", format: "iso-time" },
        message: { type: "string" },
        status: { type: "string", enum: ["pending", "confirmed", "cancelled"], default:"pending" },
        userId: { type: "string" },
        restaurantId: { type: "string" }
    },
    required: ["numberOfPeople", "date", "time", "userId", "restaurantId"],
    additionalProperties: false,
  };
  

async function createAbl(req , res){
    try {
        let reservation = req.body;

        reservation.status = "pending"

        const valid = ajv.validate(reservationSchema , reservation)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }
        reservation = dao.create(reservation)

        res.json(await reservation)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = createAbl;