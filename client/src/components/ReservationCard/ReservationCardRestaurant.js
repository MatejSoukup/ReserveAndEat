import { useContext } from "react";
import { RestaurantContext } from "../RestaurantContext";

function ReservationCardRestaurant(props) {
    console.log(props.reservation)
  const { updateReservation} = useContext(RestaurantContext);

  let reservation = props.reservation;

  const isConfirmed = reservation.status === "confirmed";
  const isCancelled = reservation.status === "cancelled";

  const handleConfirmClick = async () => {
    let confirmedReservation = reservation;

    delete confirmedReservation.restaurant;
    delete confirmedReservation.user;

    reservation.status = "confirmed"
    await updateReservation(reservation);
  };

  const handleCancelClick = async () => {
    let confirmedReservation = reservation;

    delete confirmedReservation.restaurant;
    delete confirmedReservation.user;

    reservation.status = "cancelled"
    await updateReservation(reservation);
  };

  return (
    <div>
      <div>
        <div>
          {reservation.user.email}
        </div>
        <div>
          <div>
            {reservation.restaurant.address.street}
          </div>
          <div>
            {reservation.date}
            {reservation.time}
          </div>
          <div>
            {reservation.numberOfPeople} People
          </div>
        </div>
      </div>
      <div>
        <div>
          <div onClick={handleCancelClick} style={{ color: isCancelled ? "gray" : "red", cursor: "pointer" }}>{isCancelled ? "cancelled" : "cancel"}</div>
          <div onClick={handleConfirmClick} style={{ color: isConfirmed ? "gray" : "green", cursor: "pointer" }}>{isConfirmed ? "confirmed" : "confirm"}</div>
        </div>
      </div>
    </div>
  )
}

export default ReservationCardRestaurant;