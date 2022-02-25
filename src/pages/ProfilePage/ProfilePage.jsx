import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.scss";

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
    <div className="profilePage">
      <div className="card-profile">
        <div className="text">
          <label className="profile-img"> {profile.image}</label>
        </div>
        <div className="profileInfo">
          <h4>Name: {profile.name}</h4>
          <label>E-mail: {profile.email}</label>
        </div>
        <div className="profileBtn">
          <div>
            <Link to="/profile/edit">
              <button>Edit Profile</button>
            </Link>
          </div>
          <div>
            <button className="backBtn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
