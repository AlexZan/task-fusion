import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import tasksData from '../place-holder-data.json';

const initialState = tasksData.tasks.map((task) => ({
  ...task,
  isCompleted: false,
  timeSpent: 0,
}));

const activeTasksSlice = createSlice({
  name: 'activeTasks',
  initialState,
  reducers: {
    addActiveTaskAction: (state, action) => {
      const task = action.payload;

      if (!task.id) {
        task.id = uuidv4();
      }

      state.unshift(task);
    },
    deleteTaskAction: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    moveTaskAction: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [draggedTask] = state.splice(fromIndex, 1);
      state.splice(toIndex, 0, draggedTask);
    },
    updateTaskTimeSpent: (state, action) => {
      const task = state.find(t => t.id === action.payload.id);

      if (task) {
        task.timeSpent = (task.timeSpent || 0) + action.payload.time;
      }
    },
    updateTopTaskTimeSpentAction: (state, action) => {
      if (state.length > 0) {
        state[0].timeSpent = (state[0].timeSpent || 0) + action.payload;
      }
    },
    // Inside the reducers object in createSlice
    updateTaskName: (state, action) => {
      const taskToUpdate = state.find(task => task.id === action.payload.id);
      if (taskToUpdate) {
        taskToUpdate.name = action.payload.newName;
      }
    },
  }
});

export const { addActiveTaskAction, deleteTaskAction, moveTaskAction, updateTaskTimeSpent, updateTopTaskTimeSpentAction, updateTaskName } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
