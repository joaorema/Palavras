import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function NavBar ()
{
    
    return(
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/login" className="nav-link" >Login</Link>
                <Link to="/home" className="nav-link">Home</Link>
            </div>
        </nav>
    )
}
export default NavBar