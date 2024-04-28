import RestuarantCard from "./RestaurantCard"


function RestaurantList({restaurantList}){

    return(
        
        <div>
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