import React, { useContext } from "react";
import { RestaurantContext } from "../RestaurantContext";
import { mdiCancel, mdiCheck } from "@mdi/js";
import Icon from "@mdi/react"; // Import the Icon component

function ReservationCardRestaurant(props) {
  const { updateReservation } = useContext(RestaurantContext);
  const reservation = props.reservation;

  const isConfirmed = reservation.status === "confirmed";
  const isCancelled = reservation.status === "cancelled";

  let confirmedReservation = reservation 

  const handleConfirmClick = async () => {
    

    delete confirmedReservation.restaurant;
    delete confirmedReservation.user;
    reservation.status = "confirmed";
    await updateReservation(reservation);
  };

  const handleCancelClick = async () => {
    
    delete confirmedReservation.restaurant;
    delete confirmedReservation.user;

    reservation.status = "cancelled";
    await updateReservation(reservation);
  };

  return (
    <div className="reservationCard">
      <div>
        <div className="cardHeader">{reservation.user.email}</div>
        <div className="cardBody">
          <div>{reservation.restaurant.address.street}</div>
          <div>
            {reservation.date} {reservation.time}
          </div>
          <div>{reservation.numberOfPeople} People</div>
        </div>
      </div>
      <div className="reservationStatus">
        <div>
          <div
            onClick={handleCancelClick}
            style={{ color: isCancelled ? "red" : "gray", cursor: "pointer" }}
          >
            <Icon path={mdiCancel} size={1} /> {/* Use the mdiCancel icon */}
          </div>
          <div
            onClick={handleConfirmClick}
            style={{ color: isConfirmed ? "green" : "gray", cursor: "pointer" }}
          >
            <Icon path={mdiCheck} size={1} /> {/* Use the mdiCheck icon */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationCardRestaurant;
