import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import activitiesData from '../place-holder-data.json';
import { v4 as uuidv4 } from 'uuid';

export const useActivities = () => {
  const [activities, setActivities] = useState(
    () => loadFromLocalStorage('activities') || activitiesData.activities
  );

  const addActivity = (name) => {
    const newActivity = { name, id: uuidv4() };
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const removeActivity = (activityId) => {
    setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== activityId));
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
