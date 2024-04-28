import RestuarantCard from "./RestaurantCard"

import Icon from '@mdi/react';
import { mdiStarOutline } from '@mdi/js';
import RestaurantList from "./RestaurantList";

function FavoriteRestaurantList({restaurantList}){
    return(
    <div>
    <div className="listHeader">
    <Icon path={mdiStarOutline} size={2} />
    Favorite restaurants
    </div>
        <RestaurantList restaurantList={restaurantList}/>
    </div>
    )
}

export default FavoriteRestaurantList;