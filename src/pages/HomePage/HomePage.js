// import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import ClockTime from "../../components/ClockTime/ClockTime";

function HomePage() {
  // const [hide, setHide] = useState("");

  // const handleHide = (e) => {
  //   e.preventDefault();
  //   const x = "myDIV";
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // };

  return (
    <>
      <ClockTime />
      <button onClick={"handhle"} className="myDIV">
        Hello
      </button>
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
