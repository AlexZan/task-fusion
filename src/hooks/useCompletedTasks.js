// hooks/useCompletedTasks.js
import { useSelector, useDispatch } from 'react-redux';
import { uncompleteTaskAction } from '../thunks/taskThunks';

const useCompletedTasks = () => {
  const completedTasks = useSelector(state => state.completedTasks);
  const dispatch = useDispatch();

  const handleUndoCompletion = (taskId) => {
    const taskToUncomplete = completedTasks.find(task => task.id === taskId);
    dispatch(uncompleteTaskAction(taskToUncomplete));
  };

  return {
    completedTasks,
    handleUndoCompletion,
  };
};

export default useCompletedTasks;
