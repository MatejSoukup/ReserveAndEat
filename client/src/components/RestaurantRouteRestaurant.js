import RestaurantDetail from "./RestaurantDetail"
import ReservationListRestaurant from "./ReservationListRestaurant";

function RestaurantRouteRestaurant({restaurant ,reservationList}) {
    return (
        <div className="page">
            <RestaurantDetail restaurant={restaurant} />
            {reservationList ? <ReservationListRestaurant reservationList={reservationList} /> : <div></div>}

        </div>
    )
}

export default RestaurantRouteRestaurant;