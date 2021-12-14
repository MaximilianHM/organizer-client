import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProfilePage() {
  const [profile, setProfile] = useState([]);

  const getProfileInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/users/current"
      );
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <label>Name: {profile.name}</label>
      <label>E-mail: {profile.email}</label>
      <img src={profile.image} alt="Profile" />
      <Link to="/profile/edit">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
