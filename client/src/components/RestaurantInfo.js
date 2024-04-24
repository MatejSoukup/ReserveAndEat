function RestaurantInfo(props){
return(
<div>
    <div>
        <div>
        {props.restaurant.name}
        </div>
        <div>
            Mark as favorite
        </div>
    </div>
    <div>
        Description
        <div>{props.restaurant.description}</div>
    </div>
    <div>
        Opening hours
        <div>{props.restaurant.openingHours}</div>
    </div>
    <div>
        Contacts
        <div>Address: {props.restaurant.address.street}, {props.restaurant.address.city}, {props.restaurant.address.country}</div>
        <div>Phone: {props.restaurant.phone}</div>
        <div>Email: {props.restaurant.email}</div>
        <div>Website: {props.restaurant.website}</div>
    </div>
</div>
)
}
export default RestaurantInfo;