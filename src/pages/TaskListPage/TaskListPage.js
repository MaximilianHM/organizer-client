import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaSortAlphaUp,
  FaCheck,
  FaBookDead,
  FaChartLine,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa";
import { Table } from "reactstrap";
import "./TaskListPage.css";

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

      setDeletedTask(!deletedTask);

      navigate("/categories/" + categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [deletedTask]);
  // useEffect(() => {
  //   getAllTasks();
  // }, []);

  const handleSortbyAlpha = async () => {
    const newArr = [...tasks];
    newArr.sort(function (a, b) {
      if (a.taskName < b.taskName) {
        return -1;
      }
      if (a.taskName > b.taskName) {
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
      <button onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <h1>{category.categoryName}</h1>
      <p>Sort the task by:</p>

      {tasks.map((oneTask) => {
        return (
          <Table className="TableTask" key={oneTask._id}>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            <tr>
              <th>
                <button onClick={handleSortbyAlpha}>
                  <FaSortAlphaUp />
                </button>
              </th>
              <th>
                <button onClick={handleSortbyDone}>
                  <FaCheck />
                </button>
                <button onClick={handleSortbyInProgress}>
                  <FaChartLine />
                </button>
              </th>
              <th>
                <button onClick={handleSortbyDeadLine}>
                  <FaBookDead />
                </button>
              </th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>
                <label>{oneTask.taskName}</label>
              </td>
              <td>
                <label>{oneTask.status}</label>
              </td>
              <td>
                <label>{oneTask.deadLine}</label>
              </td>
              <td>
                <label>{oneTask.description}</label>
              </td>
              <td>
                <Link to={"/tasks/" + oneTask._id}>
                  <button>
                    <FaSearch />
                  </button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(oneTask._id)}>
                  Delete
                </button>
              </td>
              {/* <Link to={"/tasks/" + oneTask._id}> */}
              {/* </Link> */}
            </tr>
          </Table>
        );
      })}
    </div>
  );
}

export default TaskListPage;
