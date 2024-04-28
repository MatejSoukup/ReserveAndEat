import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiSilverwareForkKnife } from '@mdi/js';

function RestuarantCard(props){
    const navigate = useNavigate();

    return(
    <div className="restaurantCard" onClick={() =>navigate(`/restaurantDetail?id=${props.restaurant.id}`)}>
        <div className="iconContainer"><Icon path={mdiSilverwareForkKnife} size={2} color={"grey"} /></div>
        <div className="cardContent">
        <div className="cardHeader">{props.restaurant.name}</div>
        <div className="cardBody">{props.restaurant.shortDescription}</div>
        </div>
       
    </div>
    )
}

export default RestuarantCard;