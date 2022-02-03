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
} from "react-icons/fa";
import { Table, Button } from "reactstrap";
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

  useEffect(() => {
    getAllTasks();
  }, [categoryId]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${apiURL}/api/tasks/` + taskId);

      setDeletedTask(!deletedTask);

      navigate("/categories/" + categoryId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [deletedTask]);

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
      <AddTask refreshTasks={getAllTasks} />

      <h1>{category.categoryName} tasks</h1>

      <Table>
        <div className="table-head">
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          <tr className="sorted-field">
            <th>
              <button onClick={handleSortbyAlpha}>
                <FaSortAlphaUp />
              </button>
            </th>
            <th>
              <button onClick={handleSortbyDone}>
                <FaCheck /> Done
              </button>
              <button onClick={handleSortbyInProgress}>
                <FaChartLine /> In Progress
              </button>
            </th>
            <th>
              <button onClick={handleSortbyDeadLine}>
                <FaBookDead />
              </button>
            </th>
            <th className="blank-space"></th>
            <th className="blank-space"></th>
            <th className="blank-space"></th>
          </tr>
        </div>
      </Table>
      <Table>
        {tasks.map((oneTask) => {
          return (
            <tr key={oneTask._id}>
              <td>
                <label>{oneTask.taskName}</label>
              </td>
              <td>
                <label>{oneTask.status}</label>
              </td>
              <td>
                <label>{oneTask.deadLine}</label>
              </td>
              <td className="description-field">
                <label>{oneTask.description}</label>
              </td>
              <td>
                <Link to={"/tasks/" + oneTask._id}>
                  <Button>
                    <FaSearch />
                    Details
                  </Button>
                </Link>
              </td>
              <td className="btn-delete">
                <Button
                  color="danger"
                  outline
                  onClick={() => handleDelete(oneTask._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}

export default TaskListPage;
