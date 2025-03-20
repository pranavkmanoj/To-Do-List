import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css"; 

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Task Management System</h1>
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList key={refresh} />
    </div>
  );
};

export default App;
