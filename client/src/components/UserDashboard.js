import ReservationList from "./ReservationList";
import FavoriteRestaurantList from "./FavoriteRestaurantList"

function UserDashboard({loggedInUser , reservationList}){
    return(
        <div className="page">
                <ReservationList reservationList={reservationList} />
                <FavoriteRestaurantList restaurantList={loggedInUser.favoriteRestaurants} />
        </div>
    )
}
export default UserDashboard