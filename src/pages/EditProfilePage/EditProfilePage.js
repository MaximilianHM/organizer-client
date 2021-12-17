import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../ProfilePage/ProfilePage.css";

const apiURL = process.env.REACT_APP_SERVER_URL;

function EditProfilePage() {
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // console.log("profile.name :>> ", profile.name[0]);

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
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h1>EditProfile Page</h1>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>E-mail:</label>
        <input
          type="email"
          name="name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <img src={profile.image} alt="Profile" /> */}
        <br />
        <button type="submit">Edit Profile</button>
        <button onClick={() => navigate(-1)}>Back</button>
      </form>
    </div>
  );
}

export default EditProfilePage;
