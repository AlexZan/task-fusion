// repeatTasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { addActiveTaskAction } from './activeTasksSlice';
import tasksData from '../place-holder-data.json';


const repeatTasksSlice = createSlice({
    name: 'repeatTasks',
    initialState: tasksData.repeatTasks,
    reducers: {
        addRepeatTask: (state, action) => {
            const newTask = {
              id: action.payload.id,
              name: action.payload.name,
              value: action.payload.value,
              unit: action.payload.unit,
              lastAdded: action.payload.lastAdded || null,  // added this to track when it was last added
            };
            state.push(newTask);
            return state;
          },
        deleteRepeatTask: (state, action) => {
            const id = action.payload;
            return state.filter(task => task.id !== id);
        },
        updateRepeatTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            const taskIndex = state.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                state[taskIndex] = { ...state[taskIndex], ...updatedTask };
            }
        },
    },
});

export const checkAndAddRepeatTasks = () => (dispatch, getState) => {

    const state = getState();
    const activeTasks = state.activeTasks;

    const repeatTasks = getState().repeatTasks.list;  // adjust based on your state structure


    // repeatTasks.forEach(task => {
    //     if (shouldAddTask(task, activeTasks)) {
    //         dispatch(addActiveTaskAction(task));
    //     }
    // });
};

export const shouldAddTask = (repeatTask, activeTasks) => {

    console.log("checking")
    const currentTime = Date.now();

    // Check if a task with the same name already exists in the active tasks list
    if (activeTasks.some(task => task.name === repeatTask.name)) {
        console.log(`Repeat Task "${repeatTask.name}" already exists in the active tasks.`);
        return false;
    }

    const taskLastAddedTime = repeatTask.lastAdded ? new Date(repeatTask.lastAdded).getTime() : 0;

    switch (repeatTask.unit) {
        case 'minute':
            if ((currentTime - taskLastAddedTime) >= repeatTask.value * 1000) {
                console.log(`Adding "${repeatTask.name}" as it's been more than ${repeatTask.value} minute(s) since the last time.`);
                return true;
            }
            break;
        case 'hour':
            if ((currentTime - taskLastAddedTime) >= repeatTask.value * 60 * 60 * 1000) {
                console.log(`Adding "${repeatTask.name}" as it's been more than ${repeatTask.value} hour(s) since the last time.`);
                return true;
            }
            break;
        case 'day':
        case 'week':
        case 'month':
            const dayStart = new Date();
            dayStart.setHours(0, 0, 0, 0);

            const multiplier = repeatTask.unit === 'week' ? 7 : (repeatTask.unit === 'month' ? 30 : 1);
            if ((currentTime - taskLastAddedTime) >= repeatTask.value * multiplier * 24 * 60 * 60 * 1000 &&
                taskLastAddedTime < dayStart.getTime()) {
                console.log(`Adding "${repeatTask.name}" as it's the start of a new period.`);
                return true;
            }
            break;
        default:
            console.log(`Unknown unit: ${repeatTask.unit}`);
            return false;
    }

    console.log(`Not time to add "${repeatTask.name}" yet.`);
    return false;
};



export const { addRepeatTask, deleteRepeatTask, updateRepeatTask } = repeatTasksSlice.actions;

export default repeatTasksSlice.reducer;
