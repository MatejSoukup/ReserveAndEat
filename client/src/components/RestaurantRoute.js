import { useContext } from "react";
import { RestaurantContext } from "./RestaurantContext";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail"
import ReservationForm from "./ReservationForm";


function RestaurantRoute() {
  const navigate = useNavigate();
  const { restaurant } = useContext(RestaurantContext);
  const {loggedInUser} = useContext(UserContext)
    
  return (
    <div>
        { restaurant ? <RestaurantDetail restaurant={restaurant} user={loggedInUser}/> : <div>Loading</div>}
        {loggedInUser ? <ReservationForm restaurant={restaurant} user={loggedInUser}/> : <div>login to make reservation</div>}
    </div>
  );
}

export default RestaurantRoute;