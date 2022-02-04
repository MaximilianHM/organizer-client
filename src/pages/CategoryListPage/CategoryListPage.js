import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddCategory from "./../../components/AddCategory/AddCategory";
import { AuthContext } from "../../context/auth.context";
import { FaSortAlphaUp, FaTrashAlt } from "react-icons/fa";
import "./CatergoryListPage.css";

const apiURL = process.env.REACT_APP_SERVER_URL;

function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getAllCategories = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        // "http://localhost:5005/api/categories"
        `${apiURL}/api/categories`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCategories(response.data);
      console.log("response.data :>> ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(
        // "http://localhost:5005/api/categories/"
        `${apiURL}/api/categories/` + categoryId,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setDeleted(!deleted);

      navigate("/categories");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [deleted]);

  const handleSortbyAlpha = async () => {
    const newArr = [...categories];
    newArr.sort(function (a, b) {
      if (a.categoryName < b.categoryName) {
        return -1;
      }
      if (a.categoryName > b.categoryName) {
        return 1;
      }
      return 0;
    });

    setCategories([...newArr]);
  };

  return (
    <>
      <div className="category-list-page">
        <h1>Select a category or create a new one</h1>
      </div>
      <div className="sidenav">
        <h1>Categories</h1>
        <AddCategory refreshCategories={getAllCategories} />
        <button onClick={handleSortbyAlpha}>
          <FaSortAlphaUp />
        </button>
        {categories.map((oneCategory) => {
          return (
            <div key={oneCategory._id} className="category-field">
              {user && (
                <div className="category-sidebar">
                  <Link to={"/categories/" + oneCategory._id}>
                    <p>{oneCategory.categoryName}</p>
                  </Link>
                </div>
              )}

              <button onClick={() => handleDelete(oneCategory._id)}>
                <FaTrashAlt />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CategoryListPage;
