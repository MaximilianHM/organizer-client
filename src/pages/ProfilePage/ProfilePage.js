import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const apiURL = process.env.REACT_APP_SERVER_URL;

function ProfilePage() {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
          const response = await axios.get(`${apiURL}/api/users/current`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfileInfo();
  }, []);

  return (
    <div className="card-profile">
      <div className="text">
        <label
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "100%",
            fontSize: "70px",
          }}
          className="profile-img"
        >
          {" "}
          {profile.image}
        </label>

        <h4>Name: {profile.name}</h4>
        <label>E-mail: {profile.email}</label>
        <div>
          <Link to="/profile/edit">
            <button>Edit Profile</button>
          </Link>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
