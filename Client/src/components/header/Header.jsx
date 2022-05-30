// ICON & LOGIN/OUT
import {useContext} from "react";
import {authContext} from "../../context/authContext";
import "./header.css"

const Header = () => {

  const {user, onLoading, error, authDispatcher} =useContext(authContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo"><a href="/" style={{color:"inherit", textDecoration:"none"}}>TenantsCount</a></span>
        {user ? (" Welcome "+ user.username) : (<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>)}
      </div>
    </div>
  )
}

export default Header