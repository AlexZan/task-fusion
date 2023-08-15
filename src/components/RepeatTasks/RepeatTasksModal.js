import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRepeatTasks } from '../../hooks/useRepeatTasks';
import ThemedDialog from '../ThemedDialog';
import RepeatTaskTimeControl from './RepeatTaskTimeControl';
import { IconButton } from '../IconButton';

function TaskTitleColumn({ task }) {
  return <div className="theme-text-dark">{task.name}</div>;
}

function RepeatTasksTable({ tasks, children, recentlyAddedTaskId, deleteTask }) {
  return tasks.map((task) => (
    <div
      key={task.id}
      className={`item-container flex justify-between items-center ${task.id === recentlyAddedTaskId ? 'highlight-task' : ''}`}
    >
      <div className="flex-grow flex justify-between items-center">
        {children(task).map((Child, index) => (
          <React.Fragment key={index}>{Child}</React.Fragment>
        ))}
      </div>
      <IconButton onClick={() => deleteTask(task.id)} hoverClassName="hover:text-red-500">
        <AiOutlineDelete />
      </IconButton>
    </div>
  ));
}


// The modal
export default function RepeatTasksModal({ isOpen, onClose }) {
  const { repeatTasks, addRepeatTask, deleteRepeatTask } = useRepeatTasks();

  const [newTask, setNewTask] = useState({
    name: '',
    repeat: 1,
  });

  // Track the ID of the recently added task
  const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

  // Clear recentlyAddedTaskId when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setRecentlyAddedTaskId(null);
    }
  }, [isOpen]);

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.name.trim() !== '' && newTask.repeat > 0) {
      const newTaskId = addRepeatTask(newTask.name, newTask.repeat);
      setNewTask({ name: '', repeat: 1 });
      setRecentlyAddedTaskId(newTaskId);
    }
  };

  const handleCloseModal = () => {
    setRecentlyAddedTaskId(null); // Reset the recently added task ID
    onClose(); // Call the provided onClose function
  };

  return (
    <ThemedDialog open={isOpen} onClose={onClose} width="max-w-4xl">
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        aria-label="Close modal"
      >
        <FaTimes />
      </button>

      <ThemedDialog.Title className="text-3xl leading-6 font-medium theme-text-dark padding-large">
        Repeat Tasks
      </ThemedDialog.Title>
      <div className="padding-medium text-lg">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            onKeyDown={handleInputKeyPress}
            className="input-theme w-full -ml-1"
            placeholder="Type a new repeat task and press Enter"
          />
          <RepeatTaskTimeControl task={newTask} setTask={setNewTask} onKeyPress={handleInputKeyPress} />
        </div>
        <RepeatTasksTable
          tasks={repeatTasks}
          recentlyAddedTaskId={recentlyAddedTaskId}
          deleteTask={deleteRepeatTask}
        >
          {(task) => [
            <TaskTitleColumn task={task} />,
            <RepeatTaskTimeControl task={task} />,
          ]}
        </RepeatTasksTable>
      </div>
    </ThemedDialog>
  );
}
