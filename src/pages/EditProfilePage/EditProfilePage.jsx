import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../ProfilePage/ProfilePage.scss";
import "./EditProfilePage.scss";

const apiURL = process.env.REACT_APP_SERVER_URL;

function EditProfilePage() {
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
          setProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        await axios.put(
          "http://localhost:5005/api/users/current",
          { name, email },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setProfile("");
        setName("");
        setEmail("");
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editProfilePage">
      <div className="cardProfilePage">
        <form onSubmit={handleSubmit}>
          <h1>Edit your profile</h1>
          <div className="inputField">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label>E-mail:</label>
            <input
              type="email"
              name="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="btnEditProfile">
            <button type="submit">Edit Profile</button>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
