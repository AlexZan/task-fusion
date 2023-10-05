import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRepeatTasks } from '../../hooks/useRepeatTasks';
import ThemedDialog from '../ThemedDialog';
import RepeatTaskTimeDropDown from './RepeatTaskTimeDropDown';
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

export default function RepeatTasksModal({ isOpen, onClose }) {
  const { repeatTasks, addRepeatTask, deleteRepeatTask, updateExistingTask } = useRepeatTasks();
  const [newTask, setNewTask] = useState({
    name: '',
    repeat: 1,
    unit: 'day',
  });
  const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setRecentlyAddedTaskId(null);
    }
  }, [isOpen]);

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.name.trim() !== '' && newTask.repeat > 0) {
      const newTaskId = addRepeatTask(newTask.name, newTask.repeat, newTask.unit); // Update to include unit
      setNewTask({ name: '', repeat: 1, unit: 'day' });
      setRecentlyAddedTaskId(newTaskId);
    }
  };

  const handleCloseModal = () => {
    setRecentlyAddedTaskId(null);
    onClose();
  };

  const handleNewTimeChange = (time) => {
    setNewTask({ ...newTask, repeat: time });
  };

  const handleNewUnitChange = (unit) => {
    setNewTask({ ...newTask, unit });
  };

  const handleExistingTimeChange = (taskId, time, unit) => { // adding unit parameter
    const task = repeatTasks.find((t) => t.id === taskId);
    updateExistingTask(taskId, { ...task, value: time, unit });
  };
  

  const handleExistingUnitChange = (taskId, unit) => {
    const task = repeatTasks.find((t) => t.id === taskId);
    updateExistingTask(taskId, { ...task, unit });
  };

  return (
    <ThemedDialog open={isOpen} onClose={handleCloseModal} width="max-w-4xl">
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
                <RepeatTaskTimeDropDown
                    task={newTask}
                    onTimeChange={handleNewTimeChange}
                    onUnitChange={handleNewUnitChange}
                />  
            </div>
            <RepeatTasksTable
                tasks={repeatTasks}
                recentlyAddedTaskId={recentlyAddedTaskId}
                deleteTask={deleteRepeatTask}
            >
                {(task) => [
                    <TaskTitleColumn task={task} />,
                    <RepeatTaskTimeDropDown
                        task={task}
                        onTimeChange={(time) => handleExistingTimeChange(task.id, time)}
                        onUnitChange={(unit) => handleExistingUnitChange(task.id, unit)}
                    />,
                ]}
            </RepeatTasksTable>
        </div>
    </ThemedDialog>
);

}
