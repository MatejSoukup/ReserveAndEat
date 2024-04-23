function ReservationCardRestaurant(){
    return(
        <div>
        <div>
            <div>
                {props.reservation.user.email}
            </div>
            <div>
                <div>
                    {props.reservation.restaurant.address.street}
                </div>
                <div>
                    {props.reservation.date}
                    {props.reservation.time}
                </div>
                <div>
                    {props.reservation.numberOfPeople} People
                </div>    
            </div>   
        </div>
        <div>
            <div></div>
            <div></div>
        </div>
        
        
    </div>
    )
}