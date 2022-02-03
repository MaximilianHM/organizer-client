import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../index.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <nav className="Navbar">
        <Link className="logo-image" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1584/1584892.png"
            alt="Timex logo"
          />{" "}
          TIMEX
        </Link>

        <Link to="/">
          <button>Home</button>
        </Link>

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
      </nav>
      {user && <Sidebar />}
    </div>
  );
}

export default Navbar;
