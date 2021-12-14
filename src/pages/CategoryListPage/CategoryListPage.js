import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddCategory from "./../../components/AddCategory/AddCategory";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [deletedCategory, setDeletedCategory] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5005/api/categories/" + categoryId
      );
      const deleteTask = response.data.tasks;

      const categoryToDelete = await deleteTask.filter((oneCategory) => {
        return oneCategory._id !== categoryId;
      });
      setDeletedCategory(categoryToDelete);
      getAllCategories();
      navigate("/categories/" + categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    handleDelete();
  }, []);

  return (
    <>
      <div className="CategoriesListPage">
        <h1>Categories</h1>
        <AddCategory refreshCategories={getAllCategories} />
        {categories.map((oneCategory) => {
          return (
            <div key={oneCategory._id} className="CategoryField">
              {user && (
                <Link to={"/categories/" + oneCategory._id}>
                  <h4>{oneCategory.categoryName}</h4>
                </Link>
              )}
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
