// hooks/useTasks.js
import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import tasksData from '../tasks.json';

export default function useTasks() {
  const [needToDoTasks, setNeedToDoTasks] = useState(
    loadFromLocalStorage('needToDoTasks') ||
      tasksData.needToDoTasks.map((task) => ({ ...task, completed: false }))
  );
  const [wantToDoTasks, setWantToDoTasks] = useState(
    loadFromLocalStorage('wantToDoTasks') ||
      tasksData.wantToDoTasks.map((task) => ({ ...task, completed: false }))
  );
  
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    saveToLocalStorage('needToDoTasks', needToDoTasks);
    saveToLocalStorage('wantToDoTasks', wantToDoTasks);
  }, [needToDoTasks, wantToDoTasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      completed: false,  // Add this line
    };
    console.log(newTask);
    if (newTask.listType === 'need-to-do') {
      setNeedToDoTasks((prevTasks) => [newTask, ...prevTasks]);
    } else {
      setWantToDoTasks((prevTasks) => [newTask, ...prevTasks]);
    }
  };
  
  

  const handleTaskCompletion = (id, listType) => {
    if (listType === 'need-to-do') {
      setNeedToDoTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        const uncompletedTasks = updatedTasks.filter((task) => !task.completed);
        const completedTasks = updatedTasks.filter((task) => task.completed);
        return [...uncompletedTasks, ...completedTasks];
      });
    } else {
      setWantToDoTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        const uncompletedTasks = updatedTasks.filter((task) => !task.completed);
        const completedTasks = updatedTasks.filter((task) => task.completed);
        return [...uncompletedTasks, ...completedTasks];
      });
    }
  };
  
  
  
  const handleTaskDeletion = (id, listType) => {
    if (listType === 'need-to-do') {
      setNeedToDoTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } else {
      setWantToDoTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    }
  };

  const moveTask = async (dragIndex, hoverIndex, listType) => {
  setIsMoving(true);

  const list = listType === 'need-to-do' ? needToDoTasks : wantToDoTasks;

  const newList = [...list];
  const [draggedTask] = newList.splice(dragIndex, 1);
  newList.splice(hoverIndex, 0, draggedTask);

  if (listType === 'need-to-do') {
    await setNeedToDoTasks(newList);
  } else {
    await setWantToDoTasks(newList);
  }

  setIsMoving(false);
};

  return {
    needToDoTasks,
    wantToDoTasks,
    addTask,
    handleTaskCompletion,
    handleTaskDeletion,
    moveTask,
    isMoving,
  };
}
