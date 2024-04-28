import { useContext } from 'react';
import {RestaurantContext} from './RestaurantContext';
import { useNavigate } from 'react-router-dom';

function ReservationForm({ user, restaurant }) {
  const { makeReservation } = useContext(RestaurantContext);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let originalTime = formData.get('time')

    const [hours, minutes] = originalTime.split(":");

    // Add default seconds ("00")
    const defaultSeconds = "00";

// Combine them to create the full "HH:mm:ss" format
  const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${defaultSeconds}`;



    const reservation = {
      userId: user.id,
      restaurantId: restaurant.id,
      numberOfPeople : parseInt(formData.get('numberOfPeople')),
      date: formData.get('date'),
      time: formattedTime,
      message: formData.get('message'),
    }
    if (makeReservation) {
      makeReservation(reservation);
      navigate("/")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>Reservation</div>
        <input defaultValue={1} min={1} name="numberOfPeople" type="number" placeholder="Number of people" />
        <input name="date" type="date" placeholder="Date" />
        <input name="time" type="time" placeholder="Time" />
      </div>
      <div>
        <textarea name="message" placeholder="Message for the restaurant" />
        <div>
          <input type="submit" value="Make reservation" />
        </div>
      </div>
    </form>
  );
}

export default ReservationForm;