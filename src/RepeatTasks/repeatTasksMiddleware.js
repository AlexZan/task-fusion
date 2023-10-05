import { checkAndAddRepeatTasks } from '../slices/repeatTasksSlice';  // Import the shouldAddTask function

// Repeat task check interval in milliseconds
const REPEAT_TASK_CHECK_INTERVAL = 5000;  // e.g., 60000 for 1 minute

let isIntervalSet = false; // Flag to prevent multiple intervals

const repeatTasksMiddleware = store => next => action => {
    next(action);

    switch (action.type) {
        case 'START_REPEAT_TASK_CHECK':
            if (!isIntervalSet) {
                setInterval(() => {
                    store.dispatch(checkAndAddRepeatTasks());
                }, REPEAT_TASK_CHECK_INTERVAL);
                isIntervalSet = true; // Update the flag once interval is set
            }
            break;
        default:
           break;
    }
};

export default repeatTasksMiddleware;
