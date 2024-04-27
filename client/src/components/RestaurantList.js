import { useContext } from "react";
import { RestaurantContext } from "./RestaurantContext";
import RestuarantCard from "./RestaurantCard"
import Icon from '@mdi/react';
import { mdiSilverware } from '@mdi/js';

function RestaurantList(){
    const {restaurantList} = useContext(RestaurantContext);

    return(
        
            <div className="page">
            <div className="listHeader">
            <Icon path={mdiSilverware} size={2} />
            All restaurants
            </div>
            <div className="backgroundRestaurant">
                {
                restaurantList.map(restaurant => {
                return(
                    <RestuarantCard restaurant={restaurant}/>
                )
                })
                }
            </div>
            </div>
            
    )
}

export default RestaurantList;