// hooks/useTasks.js
import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import tasksData from '../tasks.json';

export default function useTasks() {
  const [tasks, setTasks] = useState(
    loadFromLocalStorage('tasks') ||
      tasksData.tasks.map((task, index) => ({ ...task, completed: false, originalIndex: index }))
  );

  const [isMoving, setIsMoving] = useState(false);

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

  const moveTask = async (dragIndex, hoverIndex) => {
    setIsMoving(true);
  
    // Create a copy of the current tasks
    const newList = [...tasks];
  
    // Remove the task at the dragIndex from the list and store it in draggedTask
    const [draggedTask] = newList.splice(dragIndex, 1);
  
    console.log(`Dragged: ${draggedTask.task}, hover: ${newList[hoverIndex].task}`);
  
    const insertIndex = hoverIndex > dragIndex ? hoverIndex - 1 : hoverIndex;
    newList.splice(insertIndex, 0, draggedTask);
  
    // Update the tasks state with the new list
    await setTasks(newList);
  
    setIsMoving(false);
  };
  
  

  return {
    tasks,
    addTask,
    handleTaskCompletion,
    handleTaskDeletion,
    moveTask,
    isMoving,
  };
}
