import { createSlice } from '@reduxjs/toolkit';

const initialProductivityTime = 8;
const initialEnjoymentTime = 8;

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    timeLeft: initialProductivityTime,
    productivityDuration: initialProductivityTime,
    enjoymentDuration: initialEnjoymentTime,
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
      state.productivityDuration = action.payload;
    },
    setEnjoymentTime: (state, action) => {
      state.enjoymentDuration = action.payload;
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
    startAlarm: (state) => {
      state.isAlarmPlaying = true;
    },
    stopAlarm: (state) => {
      state.isAlarmPlaying = false;
    }
  },
});

export const {
  setTimeLeft,
  toggleRunning,
  setRunning,
  toggleProductivity,
  setSelectedEnjoymentItem,
  startAlarm,
  stopAlarm,
  setProductivityTime,
  setEnjoymentTime,
} = timerSlice.actions;

export default timerSlice.reducer;
