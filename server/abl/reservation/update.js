const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const reservationDao = require("../../dao/reservation/reservationDao")

const ajv = new Ajv()
const dao = new reservationDao()

addFormats(ajv, ["date", "iso-time"]);

const reservationSchema = {
    type: "object",
    properties: {
        id: {type: "string"},
        numberOfPeople: { type: "integer" },
        date: { type: "string", format: "date" },
        time: { type: "string", format: "iso-time" },
        message: { type: "string" },
        status: { type: "string", enum: ["pending", "confirmed", "cancelled"] },
        userId: { type: "string" },
        restaurantId: { type: "string" }
    },
    required: ["numberOfPeople", "date", "time", "userId", "restaurantId", "status"],
    additionalProperties: false,
  };
  

async function updateAbl(req , res){
    try {
        const reservation = req.body;

        const valid = ajv.validate(reservationSchema , reservation)

        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const updatedReservation = await dao.update(reservation)

        if (!updatedReservation) {
            res.status(404).json({
              code: "reservationNotFound",
              message: `reservation ${reservation.id} not found`,
            });
            return;
          }

        res.json(updatedReservation)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
module.exports = updateAbl;