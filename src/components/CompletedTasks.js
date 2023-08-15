import React, { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';

function CompletedTask({ task, onUncomplete }) {
  return (
    <div className="completed-task-container flex items-center">
      <input
        type="checkbox"
        checked={true}
        className="mr-2 form-checkbox text-blue-600 hover:cursor-pointer uncomplete-checkbox"
        onChange={() => onUncomplete(task.id)}
      />
      <div className="theme-text-dark">{task.name}</div>
    </div>
  );
}



export default function CompletedTasks() {
  const { completedTasks, uncompleteTask } = useContext(TasksContext);

  const handleUncomplete = (id) => {
    uncompleteTask(id);
  };

  return (
    <div className="padding-medium theme-bg-dark border-radius-large mb-4">
      <h2 className="text-2xl font-semibold mb-4 theme-text-dark">Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <div className="text-center text-gray-500">No completed tasks</div>
      ) : (
        completedTasks.map((task) => (
          <CompletedTask key={task.id} task={task} onUncomplete={handleUncomplete} />
        ))
      )}
    </div>
  );
}
