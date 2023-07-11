import React from 'react';
import { AiOutlineDelete, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

function Task({ task, handleTaskCompletion, handleTaskDeletion, listType, moveTask, index, tasks, switchTaskList }) {

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
    const newListType = listType === 'need-to-do' ? 'want-to-do' : 'need-to-do';
    switchTaskList(task.id, newListType);
  };
  

  return (
    <div className="flex items-center mb-2 task-container">
      <input
        type="checkbox"
        checked={task.completed}
        className="mr-2 form-checkbox text-blue-600"
        onChange={() => {
          console.log(`Checkbox clicked for task with id: ${task.id} in list: ${listType}`);
          handleTaskCompletion(task.id, listType);
        }}
      />

      <p className="dark:text-white">{task.task}</p>
      {index > 0 && (
        <button
          className="ml-2 text-gray-500 hover:text-green-500 transition-colors duration-200 hide-button"
          onClick={moveUp}
        >
          <AiOutlineArrowUp />
        </button>
      )}
      {index < tasks.length - 1 && (
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
        onClick={() => handleTaskDeletion(task.id, listType)}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default Task;
