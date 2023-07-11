// hooks/useTasks.js
import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import tasksData from '../tasks.json';

export default function useTasks() {
  const [tasks, setTasks] = useState(
    loadFromLocalStorage('tasks') ||
    tasksData.tasks.map((task, index) => ({ ...task, completed: false, originalIndex: index }))
  );

  const [isMoving] = useState(false);

  useEffect(() => {
    saveToLocalStorage('tasks', tasks);
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleTaskCompletion = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      const uncompletedTasks = updatedTasks.filter((task) => !task.completed);
      const completedTasks = updatedTasks.filter((task) => task.completed);
      return [...uncompletedTasks, ...completedTasks];
    });
  };

  const handleTaskDeletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const moveTask = (fromIndex, toIndex, listType) => {
    setTasks(prevTasks => {
      const tasksOfType = prevTasks.filter(task => task.listType === listType);
      const allOtherTasks = prevTasks.filter(task => task.listType !== listType);
  
      const draggedTask = tasksOfType[fromIndex];
      const newTasksOfType = [...tasksOfType];
      newTasksOfType.splice(fromIndex, 1); // remove the dragged task
      newTasksOfType.splice(toIndex, 0, draggedTask); // insert the dragged task at the new position
  
      // If the list type is 'need-to-do', the new task list should start with tasks of type 'need-to-do'
      return listType === 'need-to-do' 
        ? [...newTasksOfType, ...allOtherTasks] 
        : [...allOtherTasks, ...newTasksOfType];
    });
  };

  const switchTaskList = (id, newListType) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, listType: newListType } : task
      );
      return updatedTasks;
    });
  };
  
  


  return {
    tasks,
    addTask,
    handleTaskCompletion,
    handleTaskDeletion,
    moveTask,
    isMoving,
    switchTaskList,
  };
}
