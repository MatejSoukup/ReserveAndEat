function ReservationCardRestaurant(props){
    const isConfirmed = props.reservation.status === "confirmed";
    const isCancelled = props.reservation.status === "cancelled";

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
            <div>
                <div>{isCancelled ? "cancelled" : "disabled cancelled"}</div>
                <div>{isConfirmed ? "confirmed" : "disabled confirmed"}</div>
            </div>
        </div>
    </div>
    )
}

export default ReservationCardRestaurant;