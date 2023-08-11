import React, { useContext, useState, useEffect } from 'react';
import { TasksContext } from '../context/TasksContext';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineDelete } from 'react-icons/ai';
import { IconButton } from './IconButton';

function Task({ task, listType, index, tasks, recentlyAdded }) {
  const [isSelected, setIsSelected] = useState(false);

  const { toggleTaskCompletion, handleTaskDeletion, moveTask, switchTaskList, isTrackingMode } = useContext(TasksContext);

  const isCompletedList = listType.includes('completed');

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
      moveTask(index, index - 1, listType);
    }
  };

  const moveDown = () => {
    if (index < tasks.length - 1) {
      moveTask(index, index + 1, listType);
    }
  };

  const switchList = () => {
    console.log('test')
    const newListType = listType === 'need-to-do' ? 'want-to-do' : 'need-to-do';
    switchTaskList(task.id, newListType);
  };

  return (
    <div onClick={handleClick} className={`flex items-center mb-2 task-container ${recentlyAdded ? 'highlight-task' : ''} ${isSelected ? 'selected-task' : ''}`}>
      <input
        type="checkbox"
        checked={isCompletedList}
        className="mr-2 form-checkbox text-blue-600"
        onChange={() => toggleTaskCompletion(task.id, listType)}
      />
      <p className="dark:text-white">{task.task}</p>
      {!isCompletedList && (
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
          <IconButton onClick={switchList} hoverClassName="hover:text-green-500">
            {listType === 'need-to-do' ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
          </IconButton>
        </>
      )}
      <IconButton onClick={() => handleTaskDeletion(task.id)} hoverClassName="hover:text-red-500">
        <AiOutlineDelete />
      </IconButton>
    </div>
  );
}
export default Task;
