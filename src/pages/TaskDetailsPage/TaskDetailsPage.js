import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TaskDetailsPage() {
  const [task, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [description, setDescription] = useState("");

  const { taskId } = useParams();
  const navigate = useNavigate();

  const getTask = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/tasks/" + taskId
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const requestBody = { taskName, status, deadLine, description };
      await axios.put("http://localhost:5005/tasks/" + taskId, { requestBody });

      navigate("/tasks/" + taskId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div>
      <h1>Task Details Page</h1>
      <form onSubmit={handleSubmit}>
        <p>{task.taskName}</p>
        <p>{task.status}</p>
        <p>{task.deadLine}</p>
        <p>{task.description}</p>
      </form>
    </div>
  );
}

export default TaskDetailsPage;
