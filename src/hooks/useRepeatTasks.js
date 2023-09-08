// useRepeatTasks.js
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addRepeatTask, deleteRepeatTask } from '../slices/repeatTasksSlice';
import { startRepeatTaskInServiceWorker, stopRepeatTaskInServiceWorker } from '../services/serviceWorkerHelper';


export const useRepeatTasks = () => {
  const dispatch = useDispatch();
  const repeatTasks = useSelector(state => state.repeatTasks);

  const handleAddRepeatTask = (name, repeat) => {
    const taskId = uuidv4();
    dispatch(addRepeatTask({ id: taskId, name, repeat }));
    startRepeatTaskInServiceWorker(taskId, repeat);
    return taskId;
  };

  const handleDeleteRepeatTask = (taskId) => {
    dispatch(deleteRepeatTask(taskId));
    stopRepeatTaskInServiceWorker(taskId);
  };

  // If you have more service worker related logic/events, include them here
  // ...

  return {
    repeatTasks,
    addRepeatTask: handleAddRepeatTask,
    deleteRepeatTask: handleDeleteRepeatTask,
  };
};
