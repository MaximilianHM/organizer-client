import { useState } from "react";
import axios from "axios";

function AddCategory({ refreshCategories }) {
  const [categoryName, setCategoryName] = useState("New Catergory");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleCategoryName = (e) => setCategoryName(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const requestBody = { categoryName };
      await axios.post("http://localhost:5005/api/categories", requestBody);

      setCategoryName("");
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
