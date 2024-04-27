import { useContext } from "react";
import { UserContext } from "./UserContext";
import ReservationProvider from "./ReservationProvider";
import { ReservationContext } from "./ReservationContext";
import ReservationList from "./ReservationList";
import FavoriteRestaurantList from "./FavoriteRestaurantList"

function UserDashboard(){
    const {loggedInUser} = useContext(UserContext);

    return(
        <div className="page"> 
            <ReservationProvider filter={loggedInUser ? {userId:loggedInUser.id} : {}}>
                <Dashboard/>
            </ReservationProvider>
        </div>
    )


    function Dashboard(){
        const {reservationList} = useContext(ReservationContext);
        return(<div>
            <ReservationList reservationList={reservationList}/>
            {console.log(loggedInUser)}
            <FavoriteRestaurantList restaurants={loggedInUser ? loggedInUser.favoriteRestaurants : [] }/>
        </div>)
    }
}



export default UserDashboard;  