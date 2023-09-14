import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { useDrag, useDrop } from 'react-dnd';

import { IconButton } from './IconButton';
import useActiveTasks from '../hooks/useActiveTasks';
import useTime from '../hooks/useTime';
import InfoPanel from './InfoPanel';

const ItemType = 'TASK';

function Task({ task, index, recentlyAdded }) {

  const { completeTask, handleDeleteTask, moveTask } = useActiveTasks();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { selectEnjoymentItem, isProductivity, selectedEnjoymentItem } = useTime();
  const isTopTaskInProductivityMode = isProductivity && index === 0;


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
    setIsInfoOpen(!isInfoOpen);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    handleDeleteTask(task.id);
  }

  const handleSelection = (task) => {
    if (isProductivity) return;

    setIsInfoOpen(true);
    selectEnjoymentItem({ ...task, type: 'task' });
  };


  const isSelected = useCallback((currentTask) =>
    !isProductivity && selectedEnjoymentItem?.id === currentTask.id && selectedEnjoymentItem?.type === 'task',
    [selectedEnjoymentItem, isProductivity]);


    useEffect(() => {
      if (!isSelected(task)) {
        setIsInfoOpen(false);
      }
  }, [isSelected, task]);
  

  const className = `
    flex items-center item-container 
  
    ${recentlyAdded ? 'highlight-task' : ''} 
    ${isSelected(task) || isTopTaskInProductivityMode ? 'selected-item' : ''}
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
          onChange={() => completeTask(task)}
        />
        <p className="dark:text-white">{task.name}</p>
        <IconButton onClick={handleInfoClick} hoverClassName="hover:text-blue-500">
          <AiOutlineInfoCircle />
        </IconButton>
        <IconButton onClick={handleDelete} hoverClassName="hover:text-red-500">
          <AiOutlineDelete />
        </IconButton>
      </div>
      <InfoPanel isOpen={isInfoOpen || isSelected(task) || isTopTaskInProductivityMode} item={task} />
    </div>
  );
}
export default Task;
