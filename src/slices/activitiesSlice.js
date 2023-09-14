import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import activitiesData from '../place-holder-data.json';

const initialState = activitiesData.activities.map((activity) => ({ ...activity, timeSpent: 0 }));

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: (state, action) => {
      state.push({ name: action.payload, id: uuidv4(), timeSpent: 0 });
    },
    removeActivity: (state, action) => {
      return state.filter((activity) => activity.id !== action.payload);
    },
    updateActivityTimeSpent: (state, action) => {

      const activity = state.find((activity) => activity.id === action.payload.id);

      if (activity) {
        activity.timeSpent += action.payload.time;
      }
    },
  },
});

export const { addActivity, removeActivity, updateActivityTimeSpent } = activitiesSlice.actions;
export default activitiesSlice.reducer;
    