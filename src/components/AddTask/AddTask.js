import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegCalendarPlus } from "react-icons/fa";
import "./AddTask.css";

const apiURL = process.env.REACT_APP_SERVER_URL;

function AddTask({ refreshTasks }) {
  const [taskName, setTaskName] = useState("New Task");
  const [status, setStatus] = useState("In progress");
  const [deadLine, setDeadLine] = useState("");
  const [description, setDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { categoryId } = useParams();

  const handleTaskName = (e) => setTaskName(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleDeadLine = (e) => setDeadLine(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = {
        taskName,
        status,
        deadLine,
        description,
        categoryId,
      };

      await axios.post(`${apiURL}/api/tasks`, requestBody);

      setTaskName("New Task");
      setStatus("In progress");
      setDeadLine("");
      setDescription("");
      setErrorMessage(undefined);
      refreshTasks();
    } catch (error) {
      setErrorMessage("At least 3 characters");
    }
  };
  return (
    <div className="addform">
      <h3>Add a Task</h3>
      <form className="form-flex" onSubmit={handleSubmit}>
        <div className="row-task">
          <div className="input-task">
            <label>Task name</label>
            <input
              name="taskName"
              type="text"
              value={taskName}
              onChange={handleTaskName}
            />
          </div>

          <div className="input-task">
            <label>Status</label>
            <select name="status">
              <option onChange={handleStatus} value="In Progres">
                In Progres
              </option>
              <option onChange={handleStatus} value="Done">
                Done
              </option>
              <option onChange={handleStatus} value="Canceled">
                Canceled
              </option>
            </select>
          </div>
          <div className="input-task deadline">
            <label>Deadline</label>
            <input
              name="deadLine"
              type="date"
              value={deadLine}
              onChange={handleDeadLine}
            />
          </div>
        </div>
        <div className="task-description">
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            value={description}
            onChange={handleDescription}
          />
        </div>
        <button>
          <FaRegCalendarPlus /> Add task
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default AddTask;
