import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { DashboardContext } from "./DashboardContext";
import ReservationList from "./ReservationList";
import FavoriteRestaurantList from "./FavoriteRestaurantList"

function Dashboard(){
    const {loggedInUser} = useContext(UserContext);
    const {reservationList,handlerMap} = useContext(DashboardContext);

    useEffect(() =>{
        

        if(loggedInUser){
            const filters = {
                userId: loggedInUser.id
            }

            handlerMap.setFilters(filters)
         }
    },[loggedInUser])

   if(loggedInUser){
    console.log(loggedInUser)
        if(loggedInUser.roleId ==="6ee839e68351065260ffd7c5d6aca006")
        {
            return(
                <div>restaurant</div>
            )
        } else if(loggedInUser.roleId ==="6dc9e10052b05af79d8d274790321b13"){
            return(
                <div>Admin</div>
            )
        }else{
            return(<div className="page">
                <ReservationList reservationList={reservationList}/>
                <FavoriteRestaurantList restaurants={loggedInUser ? loggedInUser.favoriteRestaurants : [] }/>
            </div>)
        }
    }
    
}



export default Dashboard;  