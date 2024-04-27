import RestuarantCard from "./RestaurantCard"

import Icon from '@mdi/react';
import { mdiStarOutline } from '@mdi/js';

function FavoriteRestaurantList(props){
    return(
    <div>
    <div className="listHeader">
    <Icon path={mdiStarOutline} size={2} />
    Favorite restaurants
    </div>
    <div className="backgroundRestaurant">
        {props.restaurants && props.restaurants.map(restaurant => {
            return(
            <RestuarantCard restaurant={restaurant}/>
        )
        })}
    </div>
    </div>
    )
}

export default FavoriteRestaurantList;