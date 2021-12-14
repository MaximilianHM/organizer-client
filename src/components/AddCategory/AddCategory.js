import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const apiURL = process.env.REACT_APP_SERVER_URL;

function AddCategory({ refreshCategories }) {
  const [categoryName, setCategoryName] = useState("New Catergory");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user } = useContext(AuthContext);

  const handleCategoryName = (e) => setCategoryName(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const requestBody = {
        categoryName,
        usernameId: user._id,
      };
      await axios.post(
        `${apiURL}/api/categories`,
        // "http://localhost:5005/api/categories"
        requestBody
      );

      setCategoryName("New Catergory");
      // setCreator(creatorId);
      setErrorMessage(undefined);
      refreshCategories();
    } catch (error) {
      setErrorMessage("At least 3 characters");
    }
  };
  return (
    <div className="AddCatergory">
      <h3>Add a category</h3>

      <form onSubmit={handleSubmit}>
        <label>Choose a category name</label>
        <input
          name="categoryName"
          type="text"
          value={categoryName}
          onChange={handleCategoryName}
        />
        <button>Add new category</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default AddCategory;
