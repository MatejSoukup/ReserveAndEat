import ReservationCardRestaurant from './ReservationCard/ReservationCardRestaurant'

import Icon from '@mdi/react';
import { mdiCalendarMultiselect } from '@mdi/js';

function ReservationListRestaurant({reservationList}){
return( 
<div>
    <div className="listHeader">
    <Icon path={mdiCalendarMultiselect} size={1.5} />
        Reservations

        
    </div>
    <div className="backgroundReservation">
        {reservationList.map(reservation => {
        return(
        <ReservationCardRestaurant reservation={reservation}/>
        )})}
    </div>

</div>
)
}

export default ReservationListRestaurant;