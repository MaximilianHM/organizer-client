import "./Menu.scss";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddCategory from "./../../components/AddCategory/AddCategory";
import { AuthContext } from "../../context/auth.context";
import { FaSortAlphaUp, FaTrashAlt } from "react-icons/fa";

const apiURL = process.env.REACT_APP_SERVER_URL;

function Menu({ menuOpen, setMenuOpen }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(`${apiURL}/api/categories`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(`${apiURL}/api/categories/` + categoryId, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setDeleted(!deleted);

      navigate("/");
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
      {isLoggedIn && (
        <div className={"menu " + (menuOpen && "active")}>
          <>
            <div className="hamburguer" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="line1"></span>
              <span className="line2"> Open Categories</span>
              <span className="line3"></span>
            </div>
            <div className="sidenav">
              <h1>Categories</h1>
              <AddCategory refreshCategories={getAllCategories} />
              <div className="alphaButton">
                <button onClick={handleSortbyAlpha}>
                  <FaSortAlphaUp />
                </button>
              </div>
              {categories.map((oneCategory) => {
                return (
                  <div
                    key={oneCategory._id}
                    className={
                      "category-field " + (menuOpen && "active") + "Flipped"
                    }
                  >
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
        </div>
      )}
    </>
  );
}

export default Menu;
