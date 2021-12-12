import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState([]);

  const { categoryId } = useParams();

  const getAllTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/categories/" + categoryId
      );
      const allTasks = response.data.tasks;
      const oneCategory = response.data;

      setTasks(allTasks);
      setCategory(oneCategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="CategoriesListPage">
      <h1>Categories Page</h1>
      <h1>ADD TASK BUTTON</h1>
      <h1>{category.categoryName}</h1>

      {tasks.map((oneTask) => {
        return (
          <div key={oneTask._id} className="CategoryField">
            <Link to={"/tasks/" + oneTask._id}>
              <h4>{oneTask.taskName}</h4>
              <p>{oneTask.status}</p>
              <p>{oneTask.deadLine}</p>
            </Link>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default TaskListPage;
