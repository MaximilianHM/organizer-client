import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddCategory from "./../../components/AddCategory/AddCategory";

function CategoryListPage() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="CategoriesListPage">
      <h1>Categories</h1>
      <AddCategory refreshCategories={getAllCategories} />
      {categories.map((oneCategory) => {
        return (
          <div key={oneCategory._id} className="CategoryField">
            <Link to={"/categories/" + oneCategory._id}>
              <h4>{oneCategory.categoryName}</h4>
            </Link>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryListPage;
