import { useContext, useEffect } from "react";
import { RestaurantContext } from "./RestaurantContext";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail"
import ReservationForm from "./ReservationForm";
import ReservationListRestaurant from "./ReservationListRestaurant";


function RestaurantRoute() {
  const navigate = useNavigate();
  const { restaurant, reservationList, setFilters } = useContext(RestaurantContext);
  const {loggedInUser} = useContext(UserContext)

  useEffect(() =>{
    if(restaurant){
        const filters = {
          restaurantId: restaurant.id
        }
        setFilters(filters)
     }
  },[loggedInUser])

 if(loggedInUser && restaurant)
 {
  if(loggedInUser.roleId ==="6ee839e68351065260ffd7c5d6aca006"  && loggedInUser.id === restaurant.userId){
    
  return(
    <div>
      {console.log(reservationList)}
      <RestaurantDetail restaurant={restaurant}/>
      {reservationList ? <ReservationListRestaurant reservationList={reservationList}/> : <div></div>}
      
    </div>
  )
  }
}

return (
  <div>
      { restaurant ? <RestaurantDetail restaurant={restaurant} user={loggedInUser}/> : <div>Loading</div>}
      {loggedInUser ? <ReservationForm restaurant={restaurant} user={loggedInUser}/> : <div>login to make reservation</div>}
  </div>
);

}

export default RestaurantRoute;