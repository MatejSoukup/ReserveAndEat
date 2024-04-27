import { useNavigate } from "react-router-dom";

function NavigationButtons({children}){
    const navigate = useNavigate();
    return(
    <>
        <div>
        <a onClick={() => navigate("/")}>Dashboard</a>
        <a onClick={() => navigate("/restaurants")}>Restaurants</a>
        </div>
        {children}
    </>
    )
}

export default NavigationButtons;