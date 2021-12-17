import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSync, FaArrowLeft } from "react-icons/fa";

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
    <div>
      <h1>Task Details Page</h1>
      <form onSubmit={handleSubmit}>
        <label>{taskName}</label>
        <input
          type="text"
          name="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label>{status}</label>

        <select name="status" onChange={(e) => setStatus(e.target.value)}>
          <option value="In Progress">In Progres</option>
          <option value="Done">Done</option>
          <option value="Canceled">Canceled</option>
        </select>

        <label>{deadLine}</label>
        <input
          type="date"
          name="deadLine"
          value={deadLine}
          onChange={(e) => setDeadLine(e.target.value)}
        />
        <label>{description}</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          <FaSync />
        </button>
      </form>
      <button onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
    </div>
  );
}

export default TaskDetailsPage;
