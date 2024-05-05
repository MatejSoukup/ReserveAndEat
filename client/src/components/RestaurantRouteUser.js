import RestaurantDetail from "./RestaurantDetail"
import ReservationForm from "./ReservationForm";

function RestaurantRouteUser({loggedInUser , restaurant}) {
    return(
    <div>
        {restaurant ? <RestaurantDetail restaurant={restaurant} user={loggedInUser} /> : <div>Loading</div>}
        {loggedInUser ? <ReservationForm restaurant={restaurant} user={loggedInUser} /> : <div>login to make reservation</div>}
    </div>
    )
}
export default RestaurantRouteUser;