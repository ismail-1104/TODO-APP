import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import AddTask from "./components/AddTask";
import axios from "axios";
import TaskContainer from "./components/TaskContainer";

// const demoTasks = [
//   {
//     id: 1,
//     taskName: "First Task",
//     status: "completed",
//   },

//   {
//     id: 2,
//     taskName: "Second Task",
//     status: "completed",
//   },

//   {
//     id: 3,
//     taskName: "Third Task",
//     status: "completed",
//   },
// ];

const App = () => {
  const [tasks, setTasks] = useState([]);
  // const [completedTask, setCompletedTask] = useState(demoTasks);

  const getApiData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    setTasks(response.data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleAddClick = (task) => {
    const id = uuidv4();

    setTasks([
      ...tasks,
      {
        id,
        title: task,
        completed: false,
      },
    ]);
  };

  const handleDone = (id) => {
    const data = tasks.map((task) => {
      if (task.id == id) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(data);
  };

  const handleUndo = (id) => {
    const data = tasks.map((task) => {
      if (task.id == id) {
        return { ...task, completed: false };
      }
      return task;
    });
    setTasks(data);
  };

  const handleDelete = (id) => {
    const data = tasks.filter((task) => task.id !== id);
    setTasks(data);
  };

  const handleSave = (value, id) => {
    const data = tasks.map((task) => {
      if (task.id == id) {
        return { ...task, title: value };
      }
      return task;
    });
    setTasks(data);
  };

  return (
    <div className="container">
      <h1>TODO List</h1>
      <AddTask handleClick={handleAddClick} />
      <TaskContainer
        taskList={tasks.filter((task) => !task.completed)}
        pendingStatus={true}
        doneTask={handleDone}
        saveTask={handleSave}
      />
      <TaskContainer
        taskList={tasks.filter((task) => task.completed)}
        undoTask={handleUndo}
        deleteTask={handleDelete}
      />
    </div>
  );
};

export default App;
