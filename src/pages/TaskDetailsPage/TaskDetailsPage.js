import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
          `${apiURL}/api/tasks/`,
          +taskId
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
        <label>{task.taskName}</label>
        <input
          type="text"
          name="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label>{task.status}</label>
        <input
          type="text"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <label>{task.deadLine}</label>
        <input
          type="text"
          name="deadLine"
          value={deadLine}
          onChange={(e) => setDeadLine(e.target.value)}
        />
        <label>{task.description}</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Edit Task</button>
      </form>
    </div>
  );
}

export default TaskDetailsPage;
