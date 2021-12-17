import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Sidebar from "../../components/Sidebar/Sidebar";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <nav className="Navbar">
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

        <div className="profile-img-wrapper">
          {user && (
            <Link to="/profile">
              <p className="profile-img"> {user.image}</p>
            </Link>
          )}
        </div>
      </nav>
      {user && <Sidebar />}
    </div>
  );
}

export default Navbar;
