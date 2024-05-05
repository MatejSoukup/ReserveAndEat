import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { DashboardContext } from "./DashboardContext";
import { useLocation } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import RestaurantDashboard from "./RestaurantDashboard";
import AdminDashboard from "./AdminDashboard";


function Dashboard() {
    const { loggedInUser } = useContext(UserContext);
    const { reservationList, restaurantList, handlerMap } = useContext(DashboardContext);

    const location = useLocation();

    useEffect(() => {
        if (loggedInUser) {
            const filters = {
                userId: loggedInUser.id
            }

            handlerMap.setFilters(filters)
        }
    }, [loggedInUser, location])

    if (loggedInUser) {
        if (loggedInUser.roleId === "6ee839e68351065260ffd7c5d6aca006") {
            return (
                <RestaurantDashboard restaurantList={restaurantList}/>
            )
        } else if (loggedInUser.roleId === "6dc9e10052b05af79d8d274790321b13") {
            return (

                <AdminDashboard/>

            )
        } else {
            return (
                <UserDashboard reservationList={reservationList} loggedInUser={loggedInUser}/>
            )
        }
    } else {
        return (<div>Login to display dashboard</div>)
    }

}



export default Dashboard;  