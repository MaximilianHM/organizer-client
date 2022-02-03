import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSync, FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

import "./TaskDetailsPage.css";
const apiURL = process.env.REACT_APP_SERVER_URL;

function TaskDetailsPage() {
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [description, setDescription] = useState("");

  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5005/api/tasks/"
          `${apiURL}/api/tasks/` + taskId
        );
        const oneTask = response.data;

        setTask(oneTask);
        setTaskName(oneTask.taskName);
        setStatus(oneTask.status);
        setDeadLine(oneTask.deadLine);
        setDescription(oneTask.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.put(
        // "http://localhost:5005/api/tasks/"
        `${apiURL}/api/tasks/` + taskId,
        {
          taskName,
          status,
          deadLine,
          description,
        }
      );

      setTaskName("");
      setStatus("");
      setDeadLine("");
      setDescription("");

      navigate("/categories/" + task.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-card">
      <h1>Edit your tasks</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="edit-input">
          <div className="input-field">
            <div className="test">
              <label>Task name:</label>
              <input
                type="text"
                name="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-field">
            <label>Progress status:</label>

            <select name="status" onChange={(e) => setStatus(e.target.value)}>
              <option value="In Progress">In Progres</option>
              <option value="Done">Done</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
          <div className="input-field deadline-input">
            <label>Deadline:</label>
            <input
              type="date"
              name="deadLine"
              value={deadLine}
              onChange={(e) => setDeadLine(e.target.value)}
            />
          </div>
        </div>

        <div className="edit-description">
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="edit-btn">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <button type="submit">
            <FaSync /> Refresh
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskDetailsPage;
