import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filterPerson, setFilterPerson] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axiosInstance.get("/");
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await axiosInstance.put(`/${id}`, { status: newStatus });
            setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const filteredTasks = tasks.filter(
        (task) =>
            (filterPerson ? task.assignedTo.toLowerCase().includes(filterPerson.toLowerCase()) : true) &&
            (filterCategory ? task.category === filterCategory : true)
    );

    return (
        <div>
            <h2>Task List</h2>
            <div>
                <input type="text" placeholder="Filter by Assigned Person" value={filterPerson} onChange={(e) => setFilterPerson(e.target.value)} />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Training">Training</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Assigned To</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Updation</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.name}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.category}</td>
                            <td>{task.status}</td>
                            <td>
                                <button onClick={() => handleDelete(task._id)}>Delete</button>
                            </td>
                            <td>
                                <select value={task.status} onChange={(e) => handleUpdateStatus(task._id, e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;