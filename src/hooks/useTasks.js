// hooks/useTasks.js
import { useState, useEffect } from 'react';
import tasksData from '../tasks.json';

export default function useTasks() {
  const [needToTasks, setNeedToTasks] = useState([]);
  const [likeToTasks, setLikeToTasks] = useState([]);

  useEffect(() => {
    setNeedToTasks(tasksData.needToTasks);
    setLikeToTasks(tasksData.likeToTasks);
  }, []);

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

  return {
    needToTasks,
    likeToTasks,
    addTask,
    handleTaskCompletion,
    handleTaskDeletion,
  };
}
