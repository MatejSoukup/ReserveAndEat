function ReservationCardUser(props){
    return(
        <div>
            <div>
                <div>
                    {props.reservation.restaurant.name}
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
                {props.reservation.status}
            </div>
            
            
        </div>
    )
}

export default ReservationCardUser;