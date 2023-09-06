import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const completedTasksSlice = createSlice({
  name: 'completedTasks',
  initialState,
  reducers: {
    addCompletedTask: (state, action) => {
      state.push(action.payload);
    },
    deleteCompletedTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  }
});

export const { addCompletedTask, deleteCompletedTask } = completedTasksSlice.actions;
export default completedTasksSlice.reducer;
