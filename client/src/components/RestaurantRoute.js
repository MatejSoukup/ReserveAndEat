import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "./RestaurantContext";
import { UserContext } from "./UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import RestaurantRouteUser from "./RestaurantRouteUser";
import RestaurantRouteRestaurant from "./RestaurantRouteRestaurant";

function RestaurantRoute() {
  const { restaurant, reservationList, setFilters, restaurantStatus } = useContext(RestaurantContext);
  const { loggedInUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {

    if(restaurant){

      const filters = { restaurantId: restaurant.id };
      setFilters(filters);

    }
      
    
  }, [loggedInUser, location, restaurantStatus]);

  const isRestaurantOwner = () => {
    return loggedInUser && restaurant && loggedInUser.roleId === "6ee839e68351065260ffd7c5d6aca006" && loggedInUser.id === restaurant.userId;
  };

  if (isRestaurantOwner()) {
    return <RestaurantRouteRestaurant reservationList={reservationList} restaurant={restaurant} />;
  }

  return (
    <div>
      <RestaurantRouteUser loggedInUser={loggedInUser} restaurant={restaurant} />
    </div>
  );
}

export default RestaurantRoute;