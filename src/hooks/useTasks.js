import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import tasksData from '../place-holder-data.json';

export default function useTasks() {
  const [isTrackingMode, setTrackingMode] = useState(false);

  // Only loading the tasks array from the JSON file
  const [activeTasks, setActiveTasks] = useState(
    loadFromLocalStorage('activeTasks') ||
    tasksData.tasks.map((task, index) => ({ ...task, originalIndex: index, isCompleted: false, timeSpent: 0 }))
  );

  const [completedTasks, setCompletedTasks] = useState(
    loadFromLocalStorage('completedTasks') || []
  );

  useEffect(() => {
    saveToLocalStorage('activeTasks', activeTasks);
    saveToLocalStorage('completedTasks', completedTasks);
  }, [activeTasks, completedTasks]);

  const addTask = (task) => {
    const newTask = {
      id: uuidv4(), // Generate a unique UUID
      ...task,
    };
    setActiveTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const moveTask = (fromIndex, toIndex) => {
    setActiveTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const draggedTask = newTasks[fromIndex];
      newTasks.splice(fromIndex, 1); // remove the dragged task
      newTasks.splice(toIndex, 0, draggedTask); // insert the dragged task at the new position
      return newTasks;
    });
  };

  const completeTask = (id) => {
    const index = activeTasks.findIndex((task) => task.id === id);
    const taskToComplete = activeTasks[index];
    setCompletedTasks((prevCompletedTasks) => [
      taskToComplete,
      ...prevCompletedTasks,
    ]);
    setActiveTasks((prevActiveTasks) => prevActiveTasks.filter((_, i) => i !== index));
  };

  const uncompleteTask = (id) => {
    const index = completedTasks.findIndex((task) => task.id === id);
    const taskToUncomplete = completedTasks[index];
    setActiveTasks((prevActiveTasks) => [taskToUncomplete, ...prevActiveTasks]);
    setCompletedTasks((prevCompletedTasks) => prevCompletedTasks.filter((_, i) => i !== index));
  };

  const handleTaskDeletion = (id) => {
    setActiveTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    setCompletedTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const enterTrackingMode = () => {
    setTrackingMode(true);
  };

  const exitTrackingMode = () => {
    setTrackingMode(false);
  };

  const updateTimeSpentOnTask = (timeSpent) => {
    setActiveTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => {
        if (task === getCurrentTask()) {
          return { ...task, timeSpent: (task.timeSpent || 0) + timeSpent };
        }
        return task;
      });
      console.log("Updated tasks:", newTasks); // Debug log
      return newTasks;
    });
  };
  
  const getCurrentTask = () => {
    // Ensure that this computation is based on the latest state
    return activeTasks.find((task) => !task.isCompleted);
  };
  

  return {
    activeTasks,
    completedTasks,
    completeTask,
    uncompleteTask,
    addTask,
    handleTaskDeletion,
    moveTask,
    isTrackingMode,
    enterTrackingMode,
    exitTrackingMode,
    getCurrentTask,
    updateTimeSpentOnTask,
  };
}
