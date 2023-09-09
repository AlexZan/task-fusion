import { useSelector, useDispatch } from 'react-redux';
import { addActiveTaskAction, deleteTaskAction, moveTaskAction, updateTimeSpentAction, updateTopTaskTimeSpentAction } from '../slices/activeTasksSlice';
import { completeTaskAction } from '../thunks/taskThunks';

const useActiveTasks = () => {
  const activeTasks = useSelector(state => state.activeTasks);
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addActiveTaskAction(task));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTaskAction(taskId));
  };

  const completeTask = (task) => {
    dispatch(completeTaskAction(task));
  };

  const moveTask = (fromIndex, toIndex) => {
    dispatch(moveTaskAction({ fromIndex, toIndex }));
  };

  const updateTaskTimeSpent = (id, elapsedTime) => {
    dispatch(updateTimeSpentAction({id, elapsedTime}));
  };

  const handleUpdateTopTaskTimeSpent = (elapsedTime) => {
    dispatch(updateTopTaskTimeSpentAction(elapsedTime));
};

  return {
    activeTasks,
    handleAddTask,
    handleDeleteTask,
    completeTask,
    moveTask,
    updateTaskTimeSpent,
    handleUpdateTopTaskTimeSpent,
  };
};

export default useActiveTasks;
