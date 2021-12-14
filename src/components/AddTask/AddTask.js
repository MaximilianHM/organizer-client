import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
      await axios.post("http://localhost:5005/api/tasks", requestBody);

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
    <div className="AddTask">
      <h3>Add a Task</h3>

      <form onSubmit={handleSubmit}>
        <label>Choose a task name</label>
        <input
          name="taskName"
          type="text"
          value={taskName}
          onChange={handleTaskName}
        />
        <label>Choose the status</label>
        <input
          name="status"
          type="text"
          value={status}
          onChange={handleStatus}
        />
        <label>Choose a task deadline</label>
        <input
          name="deadLine"
          type="text"
          value={deadLine}
          onChange={handleDeadLine}
        />

        <label>Description</label>
        <textarea
          name="description"
          type="text"
          value={description}
          onChange={handleDescription}
        />

        <button>Add new task</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default AddTask;
