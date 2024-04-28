import { Outlet, useNavigate } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiSilverwareForkKnife } from '@mdi/js';
import { mdiHomeOutline } from '@mdi/js';



function NavigationButtons({children}){
    const navigate = useNavigate();
    return(
    <>
        <div className="navigationButtons">
        <a className="navigationButton" onClick={() => navigate("/")}>    
            <Icon path={mdiHomeOutline} size={1.1} />
            Dashboard
        </a>
        <a className="navigationButton" onClick={() => navigate("/restaurants")}>
            <Icon path={mdiSilverwareForkKnife} size={1.1} />
            Restaurants
        </a>
        </div>
        <Outlet/>
    </>
    )
}

export default NavigationButtons;