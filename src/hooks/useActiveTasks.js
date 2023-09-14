import { useSelector, useDispatch } from 'react-redux';
import { addActiveTaskAction, deleteTaskAction, moveTaskAction, updateTopTaskTimeSpentAction, updateTaskName } from '../slices/activeTasksSlice';
import { completeTaskAction } from '../thunks/taskThunks';

const useActiveTasks = () => {
  const activeTasks = useSelector(state => state.activeTasks);
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addActiveTaskAction(task));
  };

  const editTaskName = (taskId, newName) => {
    dispatch(updateTaskName({ id: taskId, newName }));
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
    dispatch(updateTaskTimeSpent({id, elapsedTime}));
  };

  const handleUpdateTopTaskTimeSpent = (elapsedTime) => {
    dispatch(updateTopTaskTimeSpentAction(elapsedTime));
};

  return {
    activeTasks,
    handleAddTask,
    editTaskName,
    handleDeleteTask,
    completeTask,
    moveTask,
    updateTaskTimeSpent,
    handleUpdateTopTaskTimeSpent,
  };
};

export default useActiveTasks;
