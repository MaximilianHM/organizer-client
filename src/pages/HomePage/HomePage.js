// import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import ClockTime from "../../components/ClockTime/ClockTime";
import "./HomePage.css";

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
    <div className="homepagebg">
      <img src="./src/bg-img.jpg" alt="" />
      <h1>Manage your time, organize yourself</h1>
      <p>Create a category and then create your tasks!</p>
    </div>
  );
}

export default HomePage;
