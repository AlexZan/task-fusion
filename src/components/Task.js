import React, { useContext, useState } from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { IconButton } from './IconButton';

import { TasksContext } from '../context/TasksContext';
import { useDeselectIfNotTracking } from '../hooks/useDeselectIfNotTracking';
import InfoPanel from './InfoPanel';

function Task({ task, index, tasks, recentlyAdded, timeTracking }) {

  const { completeTask, handleTaskDeletion, moveTask, isTrackingMode } = useContext(TasksContext);
  const { isItemSelected, toggleSelection, deselectItem } = timeTracking;
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleInfoClick = () => {
    setIsInfoOpen(!isInfoOpen); // Toggle the info panel state
  };

  useDeselectIfNotTracking(isTrackingMode, task, isItemSelected, deselectItem);

  const handleClick = () => {
    if (isTrackingMode) toggleSelection(task);
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
    <div>
      <div onClick={handleClick} className={`flex items-center item-container ${recentlyAdded ? 'highlight-task' : ''} ${isItemSelected(task) ? 'selected-item' : ''}`}>
        <input
          type="checkbox"
          checked={task.isCompleted}
          className="mr-2 form-checkbox text-blue-600"
          onChange={() => completeTask(task.id)}
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
        <IconButton onClick={handleInfoClick} hoverClassName="hover:text-blue-500">
          <AiOutlineInfoCircle />
        </IconButton>
        <IconButton onClick={() => handleTaskDeletion(task.id)} hoverClassName="hover:text-red-500">
          <AiOutlineDelete />
        </IconButton>
      </div>
      <InfoPanel isOpen={isInfoOpen} item={task} />
    </div>
  );
}
export default Task;
