import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  const { categoryId } = useParams;

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/categories/" + categoryId
      );
      setTasks(response.data);
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

      {tasks.map((oneTask) => {
        return (
          <div key={oneTask._id} className="CategoryField">
            <h4>{oneTask.categoryName}</h4>

            <button>Edit</button>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default TaskListPage;
