import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const apiURL = process.env.REACT_APP_SERVER_URL;

function ProfilePage() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
          const response = await axios.get(
            // "http://localhost:5005/api/users/current",
            `${apiURL}/api/users/current`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );
          console.log(response.data);
          setProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfileInfo();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <label>Name: {profile.name}</label>
      <label>E-mail: {profile.email}</label>
      <img style={{ width: "50px" }} src={profile.image} alt="Profile" />
      <Link to="/profile/edit">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
