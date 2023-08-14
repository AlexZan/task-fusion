import React, { useContext, useState, useEffect } from 'react';
import { TasksContext } from '../context/TasksContext';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete } from 'react-icons/ai';
import { IconButton } from './IconButton';

function Task({ task, index, tasks, recentlyAdded }) {
  const [isSelected, setIsSelected] = useState(false);

  const { toggleTaskCompletion, handleTaskDeletion, moveTask, isTrackingMode } = useContext(TasksContext);


  useEffect(() => {
    if (!isTrackingMode) {
      setIsSelected(false);
    }
  }, [isTrackingMode]);


  const handleClick = () => {
    if (isTrackingMode) setIsSelected(!isSelected);
  };

  const moveUp = () => {
    if (index > 0) {
      moveTask(index, index - 1);
    }
  };

  const moveDown = () => {
    if (index < tasks.length - 1) {
      moveTask(index, index + 1);
    }
  };

  return (
    <div onClick={handleClick} className={`flex items-center mb-2 task-container ${recentlyAdded ? 'highlight-task' : ''} ${isSelected ? 'selected-task' : ''}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        className="mr-2 form-checkbox text-blue-600"
        onChange={() => toggleTaskCompletion(task.id)}
      />
      <p className="dark:text-white">{task.name}</p>
      {!task.isCompleted && (
        <>
          {index > 0 && (
            <IconButton onClick={moveUp} hoverClassName="hover:text-green-500">
              <AiOutlineArrowUp />
            </IconButton>
          )}
          {index < tasks.length - 1 && (
            <IconButton onClick={moveDown} hoverClassName="hover:text-green-500">
              <AiOutlineArrowDown />
            </IconButton>
          )}
        </>
      )}
      <IconButton onClick={() => handleTaskDeletion(task.id)} hoverClassName="hover:text-red-500">
        <AiOutlineDelete />
      </IconButton>
    </div>
  );
}
export default Task;
