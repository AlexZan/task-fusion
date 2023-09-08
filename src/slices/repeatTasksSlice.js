// repeatTasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

import tasksData from '../place-holder-data.json';


const repeatTasksSlice = createSlice({
    name: 'repeatTasks',
    initialState: tasksData.repeatTasks,
    reducers: {
        addRepeatTask: (state, action) => {
            const newTask = { id: action.payload.id, name: action.payload.name, repeat: action.payload.repeat };
            state.push(newTask);
            return state;
        },
        deleteRepeatTask: (state, action) => {
            const id = action.payload;
            return state.filter(task => task.id !== id);
        },
    },
});

export const { addRepeatTask, deleteRepeatTask } = repeatTasksSlice.actions;

export default repeatTasksSlice.reducer;
