import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import tasksData from '../place-holder-data.json';
import { v4 as uuidv4 } from 'uuid';


export const useRepeatTasks = () => {
  const [repeatTasks, setRepeatTasks] = useState(
    () => loadFromLocalStorage('repeatTasks') || tasksData.repeatTasks
  );

  const startRepeatTaskInServiceWorker = (taskId, duration) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        action: 'startRepeatTask',
        taskId,
        duration,
      });
    } else {
      console.warn('Service worker controller not found. Unable to start repeat task.');
    }
  };
  
  const stopRepeatTaskInServiceWorker = (taskId) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        action: 'stopRepeatTask',
        taskId,
      });
    } else {
      console.warn('Service worker controller not found. Unable to stop repeat task.');
    }
  };
  

  const addRepeatTask = (name, repeat) => {
    const newTaskId = uuidv4();
    const newRepeatTask = { name, repeat, id: newTaskId };
    setRepeatTasks((prevTasks) => [...prevTasks, newRepeatTask]);
    startRepeatTaskInServiceWorker(newTaskId, repeat);
    return newTaskId; 
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
