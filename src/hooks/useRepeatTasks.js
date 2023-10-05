// useRepeatTasks.js
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addRepeatTask, deleteRepeatTask, updateRepeatTask } from '../slices/repeatTasksSlice';


export const useRepeatTasks = () => {
  const dispatch = useDispatch();
  const repeatTasks = useSelector(state => state.repeatTasks);

  const handleAddRepeatTask = (name, value, unit) => {
    const taskId = uuidv4();
    dispatch(addRepeatTask({ id: taskId, name, value, unit }));
    return taskId;
  };
  
  const handleDeleteRepeatTask = (taskId) => {
    dispatch(deleteRepeatTask(taskId));
  };

  const updateExistingTask = (taskId, updatedTask) => {
    dispatch(updateRepeatTask({ id: taskId, updatedTask }));
  };


  return {
    repeatTasks,
    addRepeatTask: handleAddRepeatTask,
    deleteRepeatTask: handleDeleteRepeatTask,
    updateExistingTask,
  };
};
