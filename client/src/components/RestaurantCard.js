import { useState } from "react";

import Icon from '@mdi/react';
import { mdiSilverwareForkKnife } from '@mdi/js';

function RestuarantCard(props){
    return(
    <div className="restaurantCard">
        <div className="iconContainer"><Icon path={mdiSilverwareForkKnife} size={2} color={"grey"} /></div>
        <div className="cardContent">
        <div className="cardHeader">{props.restaurant.name}</div>
        <div className="cardBody">{props.restaurant.shortDescription}</div>
        </div>
       
    </div>
    )
}

export default RestuarantCard;