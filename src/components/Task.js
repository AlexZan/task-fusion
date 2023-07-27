import React, { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';
import { AiOutlineDelete, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

function Task({ task, listType, index, tasks }) {
  const { toggleTaskCompletion, handleTaskDeletion, moveTask, switchTaskList } = useContext(TasksContext);

  const isCompletedList = listType.includes('completed');

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
    <div className="flex items-center mb-2 task-container">
      <input
        type="checkbox"
        checked={isCompletedList}
        className="mr-2 form-checkbox text-blue-600"
        onChange={() => toggleTaskCompletion(task.id, listType)}
      />
      <p className="dark:text-white">{task.task}</p>
      {!isCompletedList && index > 0 && (
        <button
          className="ml-2 text-gray-500 hover:text-green-500 transition-colors duration-200 hide-button"
          onClick={moveUp}
        >
          <AiOutlineArrowUp />
        </button>
      )}
      {!isCompletedList && index < tasks.length - 1 && (
        <button
          className="ml-2 text-gray-500 hover:text-green-500 transition-colors duration-200 hide-button"
          onClick={moveDown}
        >
          <AiOutlineArrowDown />
        </button>
      )}
      <button
        className="ml-2 text-gray-500 hover:text-green-500 transition-colors duration-200 hide-button"
        onClick={switchList}
      >
        {listType === 'need-to-do' ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
      </button>
      <button
        className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-200 hide-button"
        onClick={() => handleTaskDeletion(task.id)}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default Task;
