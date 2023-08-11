import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

import { loadFromLocalStorage } from '../../utils/localStorage';
import ThemedDialog from '../ThemedDialog';
import useTasks from '../../hooks/useTasks';
import RepeatTaskTimeControl from './RepeatTaskTimeControl';
import { saveToLocalStorage } from '../../utils/localStorage';
import { IconButton } from '../IconButton';


function TaskTitleColumn({ task }) {
  return <div className="theme-text-dark">{task.task}</div>;
}

function RepeatTasksTable({ tasks, setTasks, children, recentlyAddedTaskId, deleteTask }) {
  return tasks.map((task) => (
    <div
      key={task.id}
      className={`task-container flex justify-between items-center ${task.id === recentlyAddedTaskId ? 'highlight-task' : ''}`}
    >
      <div className="flex-grow flex justify-between items-center">
        {children(task, (newTask) => setTasks(prevTasks => prevTasks.map(t => t.id === newTask.id ? newTask : t))).map((Child, index) => (
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
  const { activeTasks, completedTasks } = useTasks();
  
  const allTasks = [...activeTasks, ...completedTasks];

  const [tasks, setTasks] = useState(() => loadFromLocalStorage('repeatTasks') || allTasks.filter(task => task.repeat && task.repeat > 0));

  const [newTask, setNewTask] = useState({
    task: '',
    repeat: 1,
  });

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Track the ID of the recently added task
  const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

  useEffect(() => {
    saveToLocalStorage('repeatTasks', tasks);
  }, [tasks]);


  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.task.trim() !== '' && newTask.repeat > 0) { // Validate task and repeat time
      const newTaskId = Date.now().toString();
      setTasks([...tasks, { ...newTask, id: newTaskId }]);
      setNewTask({ task: '', repeat: 1 }); // Set the repeat value to 1 instead of null
      setRecentlyAddedTaskId(newTaskId); // Set the recently added task ID
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
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            onKeyDown={handleInputKeyPress} // Handle Enter key press
            className="input-theme w-full -ml-1" // Apply a negative left margin
            placeholder="Type a new repeat task and press Enter"
          />
          <RepeatTaskTimeControl task={newTask} setTask={setNewTask} onKeyPress={handleInputKeyPress} />
        </div>
        <RepeatTasksTable tasks={tasks} setTasks={setTasks} recentlyAddedTaskId={recentlyAddedTaskId} deleteTask={deleteTask}>
          {(task, setTask) => [
            <TaskTitleColumn task={task} />,
            <RepeatTaskTimeControl task={task} setTask={setTask} />,
          ]}
        </RepeatTasksTable>

      </div>
    </ThemedDialog>
  );
}

