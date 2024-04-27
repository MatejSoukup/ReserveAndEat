import Icon from '@mdi/react';
import { mdiCancel } from '@mdi/js';
import { mdiCheck } from '@mdi/js';
import { mdiTimerSand } from '@mdi/js';

function ReservationCardUser(props){
    return(
        <div className="reservationCard">
            <div>
                <div className="cardHeader">
                    {props.reservation.restaurant.name}
                </div>
                <div className="cardBody">
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
            <div className="reservationStatus">
            {props.reservation.status === "cancelled" && <Icon path={mdiCancel} size={2} color={"#FF0000"} />}
            {props.reservation.status === "confirmed" && <Icon path={mdiCheck} size={2} color={"#00D909"}/>}
            {props.reservation.status === "pending" && <Icon path={mdiTimerSand} size={2} color={"#FFC700"}/>}
            </div>
            
            
        </div>
    )
}

export default ReservationCardUser;