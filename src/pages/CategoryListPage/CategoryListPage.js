import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddCategory from "./../../components/AddCategory/AddCategory";

const apiURL = process.env.REACT_APP_SERVER_URL;

function CategoryListPage() {
  const [deleted, setdeleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deletedCategory, setDeletedCategory] = useState([]);
  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:5005/api/categories"
        `${apiURL}/api/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        // "http://localhost:5005/api/categories/"
        `${apiURL}/api/categories` + categoryId
      );
      console.log(response);
      const deleteTask = response.data.tasks;

      const categoryToDelete = await deleteTask.filter((oneCategory) => {
        return oneCategory._id !== categoryId;
      });
      setDeletedCategory(categoryToDelete);
      setdeleted(!deleted);
      /*   getAllCategories(); */
      navigate("/categories/" + categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(categories);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, [deletedCategory]);

  return (
    <>
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
              <button onClick={() => handleDelete(oneCategory._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CategoryListPage;
