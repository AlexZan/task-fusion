import React, { useState, useEffect } from 'react'; // Added useEffect
import { FaTimes } from 'react-icons/fa';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorage'; // Adjust the path accordingly
import ThemedDialog from '../ThemedDialog';
import useTasks from '../../hooks/useTasks';
import RepeatTimeDropdownColumn from './RepeatTimeDropdownColumn';

// Components for table columns
function TaskTitleColumn({ task }) {
  return <div className="theme-text-dark">{task.task}</div>;
}

// The table component
function RepeatTasksTable({ tasks, setTasks, children }) {
  return tasks.map((task) => (
    <div key={task.id} className="flex justify-between items-center">
      {children(task, (newTask) => setTasks(prevTasks => prevTasks.map(t => t.id === newTask.id ? newTask : t))).map((Child, index) => (
        <React.Fragment key={index}>{Child}</React.Fragment>
      ))}
    </div>
  ));
}

// The modal
export default function RepeatTasksModal({ isOpen, onClose }) {
  const { activeTasks, completedTasks } = useTasks();
  const allTasks = [...activeTasks, ...completedTasks];
  
  // Load tasks from localStorage when the component mounts
  const [tasks, setTasks] = useState(() => loadFromLocalStorage('repeatTasks') || allTasks.filter(task => task.repeat !== null));

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    saveToLocalStorage('repeatTasks', tasks);
  }, [tasks]);

  return (
    <ThemedDialog open={isOpen} onClose={onClose} width="max-w-4xl">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        aria-label="Close modal"
      >
        <FaTimes />
      </button>
      <ThemedDialog.Title className="text-3xl leading-6 font-medium theme-text-dark padding-large">
        Repeat Tasks
      </ThemedDialog.Title>
      <div className="padding-medium text-lg">
        <RepeatTasksTable tasks={tasks} setTasks={setTasks}>
          {(task, setTask) => [
            <TaskTitleColumn task={task} />,
            <RepeatTimeDropdownColumn task={task} setTask={setTask} />
          ]}
        </RepeatTasksTable>
      </div>
    </ThemedDialog>
  );
}
