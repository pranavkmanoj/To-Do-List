import { useState } from "react";
import axiosInstance from "../axiosInstance";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState({
    name: "",
    assignedTo: "",
    category: "Marketing",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/", task);
      onTaskAdded(res.data); 
      setTask({ name: "", assignedTo: "", category: "Marketing", status: "Pending" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Task Name" value={task.name} onChange={handleChange} required />
      <input type="text" name="assignedTo" placeholder="Assigned Person" value={task.assignedTo} onChange={handleChange} required />
      <select name="category" value={task.category} onChange={handleChange}>
        <option value="Marketing">Marketing</option>
        <option value="Training">Training</option>
        <option value="Others">Others</option>
      </select>
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
