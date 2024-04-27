import ReservationCardUser from "./ReservationCard/ReservationCardUser"

import Icon from '@mdi/react';
import { mdiCalendarMultiselect } from '@mdi/js';

function ReservationList(props){
return( 
<div>
    <div className="listHeader">
    <Icon path={mdiCalendarMultiselect} size={1.5} />
        Reservations

        
    </div>
    <div className="backgroundReservation">
        {props.reservationList.map(reservation => {
        return(
        <ReservationCardUser reservation={reservation}/>
        )})}
    </div>

</div>
)
}

export default ReservationList;