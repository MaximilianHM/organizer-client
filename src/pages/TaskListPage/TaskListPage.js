import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import AddTask from "./../../components/AddTask/AddTask";

const apiURL = process.env.REACT_APP_SERVER_URL;

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState([]);
  const [deletedTask, setDeletedTask] = useState(false);

  const { categoryId } = useParams();
  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        // "http://localhost:5005/api/categories/"
        `${apiURL}/api/categories/` + categoryId,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
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
      await axios.delete(
        // "http://localhost:5005/api/tasks/"
        `${apiURL}/api/tasks/` + taskId
      );

      setDeletedTask(!false);

      navigate("/categories/" + categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getAllTasks();
  // }, []);

  useEffect(() => {
    getAllTasks();
  }, [deletedTask]);

  const handleSortbyAlpha = async () => {
    const newArr = [...tasks];
    newArr.sort(function (a, b) {
      if (a.taskName > b.taskName) {
        return -1;
      }
      if (a.taskName < b.taskName) {
        return 1;
      }
      return 0;
    });
    setTasks([...newArr]);
  };

  const handleSortbyDeadLine = async () => {
    const newArr = [...tasks];
    newArr.sort(function (a, b) {
      if (a.deadLine < b.deadLine) {
        return -1;
      }
      if (a.deadLine > b.deadLine) {
        return 1;
      }
      return 0;
    });
    setTasks([...newArr]);
  };

  const handleSortbyDone = async () => {
    const newArr = [...tasks];
    newArr.sort(function (a) {
      if (a.status === "Done") {
        return -1;
      } else {
        return 1;
      }
    });
    setTasks([...newArr]);
  };

  const handleSortbyInProgress = async () => {
    const newArr = [...tasks];
    newArr.sort(function (a) {
      if (a.status === "In progress") {
        return -1;
      } else {
        return 1;
      }
    });
    setTasks([...newArr]);
  };

  return (
    <div className="TasksListPage">
      <h1>Task List Page</h1>
      <AddTask refreshTasks={getAllTasks} />
      <h1>{category.categoryName}</h1>
      <button onClick={handleSortbyAlpha}>Sort by name</button>
      <button onClick={handleSortbyDone}>Sort by Done</button>
      <button onClick={handleSortbyInProgress}>Sort by In Progress</button>

      <button onClick={handleSortbyDeadLine}>Sort by Deadline</button>

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
