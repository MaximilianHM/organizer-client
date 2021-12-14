import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import AddTask from "./../../components/AddTask/AddTask";

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);

  const { categoryId } = useParams();
  const navigate = useNavigate();

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

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5005/api/tasks/" + taskId
      );
      console.log(response);
      const deleteTask = response.data.tasks;

      const taskToDelete = await deleteTask.filter((oneTask) => {
        return oneTask._id !== taskId;
      });
      setDeletedTask(taskToDelete);
      getAllTasks();
      navigate("/categories/" + categoryId + 1111111111);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
    handleDelete();
  }, []);

  return (
    <div className="TasksListPage">
      <h1>Task List Page</h1>
      <AddTask refreshTasks={getAllTasks} />
      <h1>{category.categoryName}</h1>

      {tasks.map((oneTask) => {
        return (
          <div key={oneTask._id} className="CategoryField">
            <Link to={"/tasks/" + oneTask._id}>
              <h4>{oneTask.taskName}</h4>
              <p>{oneTask.status}</p>
              <p>{oneTask.deadLine}</p>
            </Link>
            <Link to={"/tasks/" + oneTask._id}>
              <button>Task Details</button>
            </Link>
            <button onClick={() => handleDelete(oneTask._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default TaskListPage;
