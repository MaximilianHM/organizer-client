// import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddCategory from "./../../components/AddCategory/AddCategory";
// import EditCategory from "./../../components/EditCategory/EditCategory";
import { AuthContext } from "../../context/auth.context";
import { FaSortAlphaUp, FaTrashAlt } from "react-icons/fa";
import "./Sidebar.css";

const apiURL = process.env.REACT_APP_SERVER_URL;

function Sidebar() {
  // Get the value from the context

  const [categories, setCategories] = useState([]);
  const [deleted, setDeleted] = useState(false);
  // const [editedCat, setEditedCat] = useState("");
  // const [idCat, setIdCat] = useState("");
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
      // setEditedCat(response.data);
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

  // console.log("editedCat ", editedCat);
  // const handleEdit = async (categoryId) => {
  //   try {
  //     const categoryEdited = editedCat.map((oneEditedCategory) => {
  //       return oneEditedCategory._id;
  //     });
  //     console.log("categoryEdited :>> ", categoryEdited);

  //     const authToken = localStorage.getItem("authToken");
  //     await axios.put(
  //       // "http://localhost:5005/api/category/"
  //       apiURL + "/api/category/" + categoryId,
  //       {
  //         categoryName: editedCat,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     setEditedCat("");

  //     navigate("/categories");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllCategories();
  // }, []);

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
    // newArr.sort();
    setCategories([...newArr]);
  };

  // useEffect(() => {
  //   getAllCategories();
  // }, [editedCat]);

  return (
    <>
      {/* <div className="CategoriesListPage"> */}
      <div className="sidenav">
        <h1>Categories</h1>
        <AddCategory refreshCategories={getAllCategories} />
        <button onClick={handleSortbyAlpha}>
          <FaSortAlphaUp />
        </button>
        {categories.map((oneCategory) => {
          return (
            <div key={oneCategory._id} className="categoryField">
              {/* <EditCategory refreshCategories={getAllCategories} /> */}
              {user && (
                <Link to={"/categories/" + oneCategory._id}>
                  <p>{oneCategory.categoryName}</p>
                </Link>
              )}
              {/* <form onSubmit={() => handleEdit(oneCategory._id)}>
                <input type="text" name="categoryName" />
                <button>
                  <FaEdit />
                </button>
              </form> */}

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

export default Sidebar;