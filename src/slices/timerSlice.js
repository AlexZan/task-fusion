import { createSlice } from '@reduxjs/toolkit';

const defaultProductivityTime = 20 * 60;
const defaultEnjoymentTime = 40 * 60;

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    timeLeft: defaultProductivityTime,
    productivityTime: defaultProductivityTime,
    enjoymentTime: defaultEnjoymentTime,
    isRunning: false,
    isProductivity: true,
    selectedEnjoymentItem: null,
    isAlarmPlaying: false,
  },
  reducers: {
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setProductivityTime: (state, action) => {
      state.productivityTime = action.payload;
    },
    setEnjoymentTime: (state, action) => {
      state.enjoymentTime = action.payload;
    },
    toggleRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    setRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    toggleProductivity: (state) => {
      state.isProductivity = !state.isProductivity;
    },
    setSelectedEnjoymentItem: (state, action) => {
      state.selectedEnjoymentItem = action.payload;
    },
    toggleAlarmPlaying: (state) => {
      state.isAlarmPlaying = !state.isAlarmPlaying;
    },
  },
});

export const {
  setTimeLeft,
  toggleRunning,
  setRunning,
  toggleProductivity,
  setSelectedEnjoymentItem,
  toggleAlarmPlaying,
  setProductivityTime,
  setEnjoymentTime,
} = timerSlice.actions;

export default timerSlice.reducer;
