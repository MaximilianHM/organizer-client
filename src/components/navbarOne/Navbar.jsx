import "./Navbar.scss";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

function NavbarOne({ menuOpen, setMenuOpen }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className={"navbar " + (menuOpen && "active")}>
      <div className="wrapper">
        <div className="left">
          <Link className="logo-image" to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1584/1584892.png"
              alt="Timex logo"
            />{" "}
            TIMEX
          </Link>
        </div>
        <div className="right">
          {isLoggedIn && (
            <>
              <button onClick={logOutUser}>Logout</button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>

              <Link to="/login">
                <button>Login</button>
              </Link>
            </>
          )}
          {user && (
            <div className="profile-img-wrapper">
              <Link to="/profile">{user.image}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarOne;
