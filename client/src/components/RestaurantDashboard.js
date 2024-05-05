import RestaurantList from "./RestaurantList";
import { useNavigate } from "react-router-dom";

function RestaurantDashboard({restaurantList}) {
    const navigate = useNavigate();
    return (
        <div className="page">
            <div className="listHeader">
                User's restaurants
            </div>
            <RestaurantList restaurantList={restaurantList} />
            <div onClick={() => navigate("restaurantCreate")}>Create Restaurant</div>
        </div>
    )
}
export default RestaurantDashboard;