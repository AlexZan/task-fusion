// hooks/useTasks.js
import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import tasksData from '../tasks.json';

export default function useTasks() {
  const [needToTasks, setNeedToTasks] = useState(loadFromLocalStorage('needToTasks') || tasksData.needToTasks);
  const [likeToTasks, setLikeToTasks] = useState(loadFromLocalStorage('likeToTasks') || tasksData.likeToTasks);

  useEffect(() => {
    saveToLocalStorage('needToTasks', needToTasks);
    saveToLocalStorage('likeToTasks', likeToTasks);
  }, [needToTasks, likeToTasks]);

  const addTask = (task) => {
    if (task.listType === 'need-to') {
      setNeedToTasks((prevTasks) => [task, ...prevTasks]);
    } else {
      setLikeToTasks((prevTasks) => [task, ...prevTasks]);
    }
  };

  const handleTaskCompletion = (id, listType) => {
    if (listType === 'need-to') {
      setNeedToTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    } else {
      setLikeToTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    }
  };

  const handleTaskDeletion = (id, listType) => {
    if (listType === 'need-to') {
      setNeedToTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } else {
      setLikeToTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    }
  };

  const moveTask = (dragIndex, hoverIndex, listType) => {
    const list = listType === 'need-to' ? needToTasks : likeToTasks;
  
    const newList = [...list];
    const [draggedTask] = newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, draggedTask);
  
    if (listType === 'need-to') {
      setNeedToTasks(newList);
    } else {
      setLikeToTasks(newList);
    }
  };

  return {
    needToTasks,
    likeToTasks,
    addTask,
    handleTaskCompletion,
    handleTaskDeletion,
    moveTask,
  };
}
