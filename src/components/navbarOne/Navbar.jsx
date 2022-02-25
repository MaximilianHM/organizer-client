import "./Navbar.scss";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

function NavbarOne({ menuOpen }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className={"navbar " + (menuOpen && "active")}>
      <div className="wrapper">
        <div className="left">
          <Link className="logo-image" to="/">
            <img src="assets/Timex.png" alt="Timex logo" />
          </Link>
        </div>
        <div className="right">
          {user && (
            <div className="profile-img-wrapper">
              <Link to="/profile">{user.image}</Link>
            </div>
          )}
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
        </div>
      </div>
    </div>
  );
}

export default NavbarOne;
