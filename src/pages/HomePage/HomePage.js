// import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import ClockTime from "../../components/ClockTime/ClockTime";

function HomePage() {
  return (
    <>
      <ClockTime />

      <Link to="/categories">
        <h3>
          {" "}
          Lets go for a <FaBeer />?{" "}
        </h3>
      </Link>
    </>
  );
}

export default HomePage;
