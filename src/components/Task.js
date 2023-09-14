import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlineEdit, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';
import { useDrag, useDrop } from 'react-dnd';

import { IconButton } from './IconButton';
import useActiveTasks from '../hooks/useActiveTasks';
import useTime from '../hooks/useTime';
import InfoPanel from './InfoPanel';

const ItemType = 'TASK';

function Task({ task, index, recentlyAdded }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const { completeTask, handleDeleteTask, moveTask, editTaskName } = useActiveTasks();
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

  const handleEditClick = () => {
    setIsEditing(true);
  };


  const handleCancelClick = () => {
    setEditedName(task.name);  // Reset the editedName to the original name of the task
    setIsEditing(false);  // Exit editing mode
  }

  const handleSaveClick = () => {
    editTaskName(task.id, editedName);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedName(e.target.value);
  };


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
    flex items-center item-container pr-2
  
    ${recentlyAdded ? 'highlight-task' : ''} 
    ${isSelected(task) || isTopTaskInProductivityMode ? 'selected-item' : ''}
    ${isDragging ? 'dragging' : ''}
`;

  return (
    <div>
      <div ref={ref} className={className} onClick={() => handleSelection(task)}>
        {
          isEditing ? (
            <div className="flex items-center w-full">
              <input
                key={task.id}
                value={editedName}
                onChange={handleInputChange}
                className="flex-grow dark:bg-gray-700 dark:text-white p-1 rounded border border-gray-400 focus:border-blue-500 focus:outline-none transition duration-150 text-sm h-8 mr-2"
              />
              <IconButton onClick={handleSaveClick} hoverClassName="hover:text-blue-500">
                <AiOutlineSave />
              </IconButton>
              <IconButton onClick={handleCancelClick} hoverClassName="hover:text-red-500">
                <AiOutlineClose />
              </IconButton>
            </div>
          ) : (
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                checked={task.isCompleted}
                className="mr-2 form-checkbox text-blue-600"
                onChange={() => completeTask(task)}
              />
              <p className="flex-grow dark:text-white">{task.name}</p>
              <div className="flex items-center">
                <IconButton onClick={handleInfoClick} hoverClassName="hover:text-blue-500">
                  <AiOutlineInfoCircle />
                </IconButton>
                <IconButton onClick={handleEditClick} hoverClassName="hover:text-yellow-500">
                  <AiOutlineEdit />
                </IconButton>
                <IconButton onClick={handleDelete} hoverClassName="hover:text-red-500">
                  <AiOutlineDelete />
                </IconButton>
              </div>
            </div>
          )
        }
      </div>
      <InfoPanel isOpen={isInfoOpen || isSelected(task) || isTopTaskInProductivityMode} item={task} />
    </div>
  );

}
export default Task;
