import { useState } from "react";

const TaskContainer = ({
  taskList,
  pendingStatus,
  doneTask,
  undoTask,
  deleteTask,
  saveTask,
}) => {
  const taskheader = pendingStatus ? "Pending Tasks" : "Completed Tasks";

  const [taskName, setTaskName] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const handleEdit = (value, id) => {
    setTaskName(value);
    setShowEdit(true);
    setTaskId(id);
  };

  const handleUndo = () => {
    setShowEdit(false);
  };

  const handleSave = () => {
    saveTask(taskName, taskId);
    setShowEdit(false);
  };

  return (
    <div className="tasks-wrapper">
      <p className="task-header">{taskheader}</p>

      {taskList.map((task) => {
        if (showEdit && task.id == taskId) {
          return (
            <div className="task">
              <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <i class="fa-solid fa-floppy-disk" onClick={handleSave}></i>
              <i class="fa-solid fa-rotate-right" onClick={handleUndo}></i>
            </div>
          );
        } else {
          return (
            <div className="task">
              <p className={task.completed ? "strike" : undefined}>
                {task.title}
              </p>
              {!task.completed ? (
                <>
                  <i
                    className="fa-regular fa-circle-check"
                    onClick={() => doneTask(task.id)}
                  ></i>
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => handleEdit(task.title, task.id)}
                  ></i>
                </>
              ) : (
                <>
                  <i
                    class="fa-solid fa-rotate-right"
                    onClick={() => undoTask(task.id)}
                  ></i>
                  <i
                    class="fa-solid fa-trash"
                    onClick={() => deleteTask(task.id)}
                  ></i>
                </>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default TaskContainer;
