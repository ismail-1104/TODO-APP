import { useEffect, useState } from "react";

const AddTask = ({ handleClick }) => {
  const [task, setTasks] = useState("");
  const [showError, setShowError] = useState(false);

  const addTaskClick = () => {
    if (task) {
      handleClick(task);
      setTasks("");
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    console.log("hi from useeffect");
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }, [showError]);

  return (
    <>
      <div className="add-task">
        <input
          placeholder="Add Your Task"
          value={task}
          onChange={(event) => setTasks(event.target.value)}
        />
        <button className="btn" onClick={addTaskClick}>
          ADD
        </button>
      </div>
      {showError && <p style={{ color: "red" }}>Please Add a Task !!!</p>}
    </>
  );
};

export default AddTask;
