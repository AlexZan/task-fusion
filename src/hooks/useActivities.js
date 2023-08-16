import { useReducer, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import activitiesData from '../place-holder-data.json';
import { v4 as uuidv4 } from 'uuid';

function activitiesReducer(state, action) {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return [...state, { name: action.name, id: uuidv4() }];
    case 'REMOVE_ACTIVITY':
      return state.filter((activity) => activity.id !== action.id);
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

export default function useActivities() {
  const [activities, dispatch] = useReducer(
    activitiesReducer,
    loadFromLocalStorage('activities') || activitiesData.activities
  );

  const addActivity = (name) => {
    dispatch({ type: 'ADD_ACTIVITY', name });
  };

  const removeActivity = (activityId) => {
    dispatch({ type: 'REMOVE_ACTIVITY', id: activityId });
  };
  
  useEffect(() => {
    saveToLocalStorage('activities', activities);
  }, [activities]);

  return {
    activities,
    addActivity,
    removeActivity,
  };
};
