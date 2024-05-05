import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { DashboardContext } from "./DashboardContext";
import RestaurantList from "./RestaurantList";
import ReservationList from "./ReservationList";
import FavoriteRestaurantList from "./FavoriteRestaurantList"
import RestaurantFormProvider from "./RestaurantFormProvider";
import RestaurantCreateForm from "./RestaurantCreateForm"

function Dashboard(){
    const {loggedInUser} = useContext(UserContext);
    const {reservationList,restaurantList,handlerMap} = useContext(DashboardContext);

    useEffect(() =>{
        

        if(loggedInUser){
            const filters = {
                userId: loggedInUser.id
            }

            handlerMap.setFilters(filters)
         }
    },[loggedInUser])

   if(loggedInUser){
     if(loggedInUser.roleId ==="6ee839e68351065260ffd7c5d6aca006")
        {
            return(
                <div className="page">
                    <div className="listHeader">
                        User's restaurants
                    </div>
                        {restaurantList ? <RestaurantList restaurantList={restaurantList}/>: <div>loading</div>}
                        <RestaurantFormProvider>
                            <RestaurantCreateForm/>
                        </RestaurantFormProvider>
                    </div>
            )
        } else if(loggedInUser.roleId ==="6dc9e10052b05af79d8d274790321b13"){
            return(
                
                <div>
                   Admin
                </div>
            )
        }else{
            return(<div className="page">
                <ReservationList reservationList={reservationList}/>
                <FavoriteRestaurantList restaurantList={loggedInUser.favoriteRestaurants}/>
            </div>)
        }
    }else{
        return(<div>Login to display dashboard</div>)
    }
    
}



export default Dashboard;  