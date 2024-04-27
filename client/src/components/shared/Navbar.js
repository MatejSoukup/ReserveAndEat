import { useNavigate } from "react-router-dom";
import { Menu } from "../Menu";

function Navbar(){
    const navigate = useNavigate();

    return(
        <div className="Navbar">
            <div className="logo" onClick={() => navigate("/")}>
                ReserveAndEat
            </div>
            <div>
                <Menu/>
            </div>
        </div>
    )
}

export default Navbar;