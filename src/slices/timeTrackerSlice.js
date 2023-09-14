// timeSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const timeTrackerSlice = createSlice({
  name: 'timeTracker',
  initialState: {
    productiveTime: 0,
    passionTime: 0,
    leisureTime: 0,
    //... any other time-related states you might have
  },
  reducers: {
    increaseProductiveTime: (state, action) => {
      state.productiveTime += action.payload;
    },
    increasePassionTime: (state, action) => {
      state.passionTime += action.payload;
    },
    increaseLeisureTime: (state, action) => {
      state.leisureTime += action.payload;
    },
    resetProductiveTime: (state) => {
      state.productiveTime = 0;
    },
    resetPassionTime: (state) => {
      state.passionTime = 0;
    },
    resetLeisureTime: (state) => {
      state.leisureTime = 0;
    },
    //... any other reducers you need for the time-related state
  },
});

export const {
  increaseProductiveTime,
  increasePassionTime,
  increaseLeisureTime,
  resetProductiveTime,
  resetPassionTime,
  resetLeisureTime,
  // ... export other actions
} = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;
