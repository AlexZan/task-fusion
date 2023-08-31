import React, { useContext, useState } from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { useDrag, useDrop } from 'react-dnd';

import { IconButton } from './IconButton';
import { TasksContext } from '../context/TasksContext';
import { useTimeContext } from '../context/TimeContext';
import InfoPanel from './InfoPanel';

const ItemType = 'TASK';

function Task({ task, index, tasks, recentlyAdded }) {

  const { completeTask, deleteTask, moveTask, updateTaskTimeSpent } = useContext(TasksContext);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { selectEnjoymentItem, isProductivityTime, selectedEnjoymentItem } = useTimeContext();

  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });



  drag(drop(ref));


  const handleInfoClick = (event) => {
    event.stopPropagation();
    setIsInfoOpen(!isInfoOpen); // Toggle the info panel state
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteTask(task.id);
  }

  // Function to handle task selection
  const handleSelection = (task) => {
    if (isProductivityTime) return;
    console.log("hi")

    const updateTimeSpentHandler = (timeSpent) => {
      updateTaskTimeSpent(task.id, timeSpent);
    };

    selectEnjoymentItem({ ...task, type: 'task' }, updateTimeSpentHandler);
  };

  const moveUp = (event) => {
    event.stopPropagation();
    if (index > 0) {
      moveTask(index, index - 1);
    }
  };

  const moveDown = (event) => {
    event.stopPropagation();
    if (index < tasks.length - 1) {
      moveTask(index, index + 1);
    }
  };

  const isSelected = (task) => (isProductivityTime && index === 0) || (!isProductivityTime && selectedEnjoymentItem?.id === task.id && selectedEnjoymentItem?.type === 'task');

  const className = `
    flex items-center item-container 
  
    ${recentlyAdded ? 'highlight-task' : ''} 
    ${isSelected(task) || (isProductivityTime && index === 0) ? 'selected-item' : ''}
    ${isDragging ? 'dragging' : ''}
`;

  return (
    <div>
      <div ref={ref}
        className={className}
        onClick={() => handleSelection(task)}
      >
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
        <IconButton onClick={handleDelete} hoverClassName="hover:text-red-500">
          <AiOutlineDelete />
        </IconButton>
      </div>
      <InfoPanel isOpen={isInfoOpen || (isProductivityTime && index === 0)} item={task} />
    </div>
  );
}
export default Task;
