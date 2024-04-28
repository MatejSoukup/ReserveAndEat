import { useContext } from "react"
import { RestaurantContext } from "./RestaurantContext"


function RestaurantDetail({restaurant, user}){
    const {addtoFavorite} = useContext(RestaurantContext) 
    return(
    <>
         <div>
    <div>
        <div>
        {restaurant.name}
        </div>
        {user ?
        (<div onClick={() => addtoFavorite({restaurantId : restaurant.id, id:user.id})}>
            Mark as favorite
        </div>)
        : <div></div>
        }
    </div>
    <div>
        Description
        <div>{restaurant.description}</div>
    </div>
    <div>
        Opening hours
        <div>{restaurant.openingHours}</div>
    </div>
    <div>
        Category
        <div>{restaurant.categoryId}</div>
    </div>
    <div>
        Contacts
        <div>Address: {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.country}</div>
        <div>Phone: {restaurant.phone}</div>
        <div>Email: {restaurant.email}</div>
        <div>Website: {restaurant.website}</div>
    </div>
</div>
    </>
    )
}

export default RestaurantDetail