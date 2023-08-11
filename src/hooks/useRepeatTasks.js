import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

export const useRepeatTasks = () => {
  const [repeatTasks, setRepeatTasks] = useState(
    () => loadFromLocalStorage('repeatTasks') || []
  );

  const startRepeatTaskInServiceWorker = (taskId, duration) => {
    navigator.serviceWorker.controller.postMessage({
      action: 'startRepeatTask',
      taskId,
      duration,
    });
  };

  const stopRepeatTaskInServiceWorker = (taskId) => {
    navigator.serviceWorker.controller.postMessage({
      action: 'stopRepeatTask',
      taskId,
    });
  };

  const addRepeatTask = (task) => {
    const newTaskId = Date.now().toString();
    const newRepeatTask = { ...task, id: newTaskId };
    setRepeatTasks((prevTasks) => [...prevTasks, newRepeatTask]);
    startRepeatTaskInServiceWorker(newTaskId, newRepeatTask.repeat);
  };

  const deleteRepeatTask = (taskId) => {
    setRepeatTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    stopRepeatTaskInServiceWorker(taskId);
  };

  useEffect(() => {
    saveToLocalStorage('repeatTasks', repeatTasks);
  }, [repeatTasks]);

  useEffect(() => {
    // Message handler to receive messages from the service worker
    const handleMessage = (event) => {
      // TODO: Handle messages from the service worker related to repeat tasks
      // You will need to implement the logic here to update the main application state
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    // Clean up the event listener when the hook unmounts
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  return {
    repeatTasks,
    addRepeatTask,
    deleteRepeatTask,
  };
};
