import React, { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import DeleteButton from './DeleteButton';

function Task({ task, listType, index, tasks, recentlyAdded }) {
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

  const TaskButton = ({ onClick, children, className }) => (
    <button
      className={`ml-2 text-gray-500 hover:${className} transition-colors duration-200 hide-button`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div className={`flex items-center mb-2 task-container ${recentlyAdded ? 'highlight-task' : ''}`}>
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
            <TaskButton onClick={moveUp} className="text-green-500">
              <AiOutlineArrowUp />
            </TaskButton>
          )}
          {index < tasks.length - 1 && (
            <TaskButton onClick={moveDown} className="text-green-500">
              <AiOutlineArrowDown />
            </TaskButton>
          )}
          <TaskButton onClick={switchList} className="text-green-500">
            {listType === 'need-to-do' ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
          </TaskButton>
        </>
      )}
      <DeleteButton onClick={() => handleTaskDeletion(task.id)} className="text-red-500" />
    </div>
  );
}

export default Task;
