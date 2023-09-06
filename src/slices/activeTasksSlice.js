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
  
      state.push(task);
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
    updateTimeSpentAction: (state, action) => {
      const task = state.find(t => t.id === action.payload.id);
      if (task) {
        task.timeSpent = (task.timeSpent || 0) + action.payload.timeSpent;
      }
    }
  }
});

export const { addActiveTaskAction, deleteTaskAction, moveTaskAction, updateTimeSpentAction } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
