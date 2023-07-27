import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import tasksData from '../tasks.json';

export default function useTasks() {
  const [activeTasks, setActiveTasks] = useState(
    loadFromLocalStorage('activeTasks') ||
    tasksData.tasks.map((task, index) => ({ ...task, originalIndex: index }))
  );
  const [completedTasks, setCompletedTasks] = useState(
    loadFromLocalStorage('completedTasks') || []
  );

  const addTask = (task) => {
    const newTask = {
      ...task,
    };
    setActiveTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const toggleTaskCompletion = (id, listType) => {
    if (listType.includes('completed')) {
      const index = completedTasks.findIndex((task) => task.id === id);
      const taskToUncomplete = completedTasks[index];
      setActiveTasks((prevActiveTasks) => [
        taskToUncomplete,
        ...prevActiveTasks,
      ]);
      setCompletedTasks((prevCompletedTasks) => prevCompletedTasks.filter((_, i) => i !== index));
    } else {
      const index = activeTasks.findIndex((task) => task.id === id);
      const taskToComplete = activeTasks[index];
      setCompletedTasks((prevCompletedTasks) => [
        taskToComplete,
        ...prevCompletedTasks,
      ]);
      setActiveTasks((prevActiveTasks) => prevActiveTasks.filter((_, i) => i !== index));
    }
  };

  const handleTaskDeletion = (id) => {
    setActiveTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    setCompletedTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const switchTaskList = (id, newListType) => {
    setActiveTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, listType: newListType } : task
      );
      return updatedTasks;
    });
  };

  useEffect(() => {
    saveToLocalStorage('activeTasks', activeTasks);
    saveToLocalStorage('completedTasks', completedTasks);
  }, [activeTasks, completedTasks]);

  return {
    activeTasks,
    completedTasks,
    addTask,
    toggleTaskCompletion,
    handleTaskDeletion,
    switchTaskList,
  };
}
