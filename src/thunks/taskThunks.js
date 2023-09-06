import { addCompletedTask, deleteCompletedTask } from '../slices/completedTasksSlice';
import { addActiveTaskAction, deleteTaskAction } from '../slices/activeTasksSlice';

export const completeTaskAction = (task) => (dispatch) => {
  dispatch(deleteTaskAction(task.id));  // Remove task from activeTasks
  dispatch(addCompletedTask(task));     // Add task to completedTasks
}

export const uncompleteTaskAction = (task) => (dispatch) => {
  dispatch(deleteCompletedTask(task.id));  // Remove task from completedTasks
  dispatch(addActiveTaskAction(task));    // Add task back to activeTasks
}


