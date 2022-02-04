import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiURL = process.env.REACT_APP_SERVER_URL;

function EditCategory() {
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  const handleCategory = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await axios.put(
        apiURL + "/api/category/" + category._id,
        {
          category,
        }
      );

      setCategory("");

      navigate("/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label></label>
      <input
        type="text"
        name={category}
        value={category}
        onChange={handleCategory}
      />
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditCategory;
